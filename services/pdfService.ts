import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { supabase } from './supabaseClient';

interface DiagramData {
    email: string;
    industry: string;
    scale: string;
    diagramElement: HTMLElement;
}

export const generateAndSavePDF = async (data: DiagramData): Promise<{ success: boolean; pdfUrl?: string; error?: string }> => {
    try {
        const { email, industry, scale, diagramElement } = data;

        // STRATEGY CHANGE: Directly style the visible element to ensure capture, then revert.
        // This causes a brief flicker but guarantees html2canvas sees the content.

        // 1. Inject Print Styles
        const style = document.createElement('style');
        style.innerHTML = `
            .mermaid-diagram svg { background-color: white !important; }
            .mermaid-diagram .node rect, 
            .mermaid-diagram .node circle, 
            .mermaid-diagram .node polygon { 
                fill: #ffffff !important; 
                stroke: #000000 !important; 
                stroke-width: 2px !important; 
            }
            .mermaid-diagram .node path { 
                fill: #eeeeee !important; 
                stroke: #000000 !important; 
                stroke-width: 2px !important; 
            }
            .mermaid-diagram .edgePath .path { 
                stroke: #000000 !important; 
                stroke-width: 2px !important; 
            }
            .mermaid-diagram .label,
            .mermaid-diagram span,
            .mermaid-diagram text { 
                color: #000000 !important; 
                fill: #000000 !important; 
            }
            .mermaid-diagram .cluster rect { 
                fill: #ffffff !important; 
                stroke: #000000 !important; 
            }
        `;
        document.head.appendChild(style);

        // 2. Programmatic Overrides (Back up original values to revert)
        const paths = diagramElement.querySelectorAll('path');
        const originalPathStyles: { el: SVGPathElement; fill: string; stroke: string }[] = [];

        paths.forEach(p => {
            const fill = p.getAttribute('fill');
            if (fill && fill !== 'none') {
                originalPathStyles.push({ el: p as SVGPathElement, fill: p.style.fill, stroke: p.style.stroke });
                p.style.setProperty('fill', '#eeeeee', 'important');
                p.style.setProperty('stroke', '#000000', 'important');
            }
        });

        // 3. Capture
        const canvas = await html2canvas(diagramElement, {
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false,
            useCORS: true, // Ensure images/fonts load
        });

        // 4. Cleanup (Revert Styles)
        document.head.removeChild(style);
        originalPathStyles.forEach(item => {
            item.el.style.fill = item.fill;
            item.el.style.stroke = item.stroke;
        });

        // Step 2: Create PDF

        // Step 3: Create PDF
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height + 100], // Extra space for header
        });

        // Add branding header (White BG, Black Text)
        pdf.setFillColor(255, 255, 255); // White
        pdf.rect(0, 0, canvas.width, 60, 'F');

        pdf.setTextColor(0, 0, 0); // Black
        pdf.setFontSize(24);
        pdf.setFont('helvetica', 'bold');
        pdf.text('PARAGLOBE', 20, 35);

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${industry} | ${scale} Architecture`, 20, 50);

        // Add diagram image
        pdf.addImage(imgData, 'PNG', 0, 70, canvas.width, canvas.height);

        // Step 4: Convert PDF to blob
        const pdfBlob = pdf.output('blob');

        // Step 5: Upload to Supabase Storage
        const fileName = `architecture-${industry.toLowerCase().replace(/\s+/g, '-')}-${scale.toLowerCase()}-${Date.now()}.pdf`;
        let pdfUrl = '';
        let cloudSaveError = null;

        try {
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('diagrams')
                .upload(fileName, pdfBlob, {
                    contentType: 'application/pdf',
                    cacheControl: '3600',
                });

            if (uploadError) throw uploadError;

            // Step 5: Get public URL
            const { data: urlData } = supabase.storage
                .from('diagrams')
                .getPublicUrl(fileName);

            pdfUrl = urlData.publicUrl;

            // Step 6: Save record to database
            const { error: dbError } = await supabase
                .from('user_downloads')
                .insert([
                    {
                        email,
                        industry,
                        scale,
                        diagram_type: 'architecture',
                        pdf_url: pdfUrl,
                    },
                ]);

            if (dbError) throw dbError;

            // Step 7: Trigger Email Sending
            try {
                await supabase.functions.invoke('send-diagram-email', {
                    body: { email, industry, scale, pdfUrl },
                });
            } catch (emailError) {
                console.warn('Email sending failed:', emailError);
            }

        } catch (err: any) {
            console.warn('Cloud save failed:', err);
            cloudSaveError = err.message;
            // Create a local blob URL as fallback
            pdfUrl = URL.createObjectURL(pdfBlob);
        }

        return {
            success: true, // Always return success so the user gets the PDF
            pdfUrl,
            error: cloudSaveError ? 'Saved locally. Cloud storage unavailable.' : undefined
        };

    } catch (error: any) {
        console.error('PDF generation error:', error);
        return { success: false, error: error.message || 'Failed to generate PDF' };
    }
};

// Function to download PDF locally (as backup)
export const downloadPDF = (pdfUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    link.click();
};

// Safe open using anchor tag to prevent overwriting current window
export const openPDFViaLink = (pdfUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = filename; // Hint to download, but target _blank might open preview
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
