// Template-based architecture diagram generator
// No API calls needed - instant, reliable, and free!

interface ArchitectureTemplate {
  industry: string;
  scales: {
    [key: string]: string;
  };
}

const architectureTemplates: ArchitectureTemplate[] = [
  {
    industry: "fintech",
    scales: {
      "Startup": `graph TD
    A[Progressive Web Application] --> B[API Gateway Layer]
    B --> C[Authentication Service]
    B --> D[Transaction Engine]
    B --> E[Payment Processing]
    
    C --> F[(User Data Store)]
    D --> G[(Transaction Database)]
    E --> H[Payment Gateway Integration]
    
    H --> I[Card Processing Network]
    H --> J[Digital Wallet Services]
    
    D --> K[Fraud Detection Module]
    K --> L[Machine Learning Pipeline]
    
    M[Analytics Dashboard] --> B
    
    style A fill:#3B82F6
    style B fill:#F4C300
    style K fill:#E23D28`,

      "Growth": `graph TD
    A[Multi-Platform Client Layer] --> B[Load Balancer]
    B --> C[API Gateway Cluster]
    
    C --> D[Auth & Identity Service]
    C --> E[Core Banking Engine]
    C --> F[Payment Orchestration]
    C --> G[Risk Management]
    
    D --> H[(Distributed User DB)]
    E --> I[(Transaction Ledger)]
    F --> J[Payment Service Mesh]
    
    J --> K[Card Networks]
    J --> L[ACH Processing]
    J --> M[Crypto Gateway]
    
    G --> N[Real-Time Fraud Detection]
    N --> O[ML Model Serving]
    
    P[Data Warehouse] --> Q[Analytics Engine]
    E --> P
    F --> P
    
    R[Message Queue] --> E
    R --> F
    
    style A fill:#3B82F6
    style C fill:#F4C300
    style N fill:#E23D28`,

      "Enterprise": `graph TD
    A[Omnichannel Frontend] --> B[CDN & Edge Network]
    B --> C[Global Load Balancer]
    C --> D[API Gateway Mesh]
    
    D --> E[Identity & Access Management]
    D --> F[Core Banking Platform]
    D --> G[Payment Hub]
    D --> H[Risk & Compliance Engine]
    
    E --> I[(Distributed Identity Store)]
    F --> J[(Multi-Region Ledger)]
    G --> K[Payment Orchestration Layer]
    
    K --> L[SWIFT Network]
    K --> M[Card Processing]
    K --> N[Real-Time Payments]
    K --> O[Blockchain Settlement]
    
    H --> P[AI Fraud Prevention]
    H --> Q[Regulatory Reporting]
    
    P --> R[ML Training Pipeline]
    R --> S[(Feature Store)]
    
    T[Event Streaming Platform] --> U[Data Lake]
    F --> T
    G --> T
    H --> T
    
    U --> V[Analytics & BI]
    U --> W[ML Model Training]
    
    X[Disaster Recovery Site] -.->|Replication| J
    
    style A fill:#3B82F6
    style D fill:#F4C300
    style P fill:#E23D28`
    }
  },
  {
    industry: "healthtech",
    scales: {
      "Startup": `graph TD
    A[Patient Portal] --> B[API Gateway]
    B --> C[Authentication Service]
    B --> D[EHR Management]
    B --> E[Appointment Scheduling]
    
    C --> F[(User Database)]
    D --> G[(Health Records Store)]
    E --> H[(Calendar Database)]
    
    D --> I[HIPAA Compliance Layer]
    I --> J[Encryption Service]
    I --> K[Audit Logging]
    
    L[Telemedicine Module] --> B
    L --> M[Video Conferencing Service]
    
    style A fill:#3B82F6
    style B fill:#F4C300
    style I fill:#E23D28`,

      "Growth": `graph TD
    A[Multi-Device Client] --> B[Load Balancer]
    B --> C[API Gateway Cluster]
    
    C --> D[Identity Management]
    C --> E[EHR Platform]
    C --> F[Clinical Workflows]
    C --> G[Billing & Claims]
    
    D --> H[(Patient Identity DB)]
    E --> I[(FHIR Data Store)]
    F --> J[(Workflow Engine)]
    
    E --> K[HL7 Integration Layer]
    K --> L[Lab Systems]
    K --> M[Imaging Systems]
    K --> N[Pharmacy Systems]
    
    O[AI Diagnostics Engine] --> E
    O --> P[ML Model Repository]
    
    Q[Compliance & Security]
    Q --> R[Encryption at Rest]
    Q --> S[Access Control]
    Q --> T[Audit Trail]
    
    E --> Q
    F --> Q
    
    style A fill:#3B82F6
    style C fill:#F4C300
    style O fill:#E23D28`,

      "Enterprise": `graph TD
    A[Omnichannel Patient Experience] --> B[Global CDN]
    B --> C[Multi-Region Load Balancer]
    C --> D[API Gateway Mesh]
    
    D --> E[Enterprise Identity Provider]
    D --> F[Unified EHR Platform]
    D --> G[Clinical Decision Support]
    D --> H[Revenue Cycle Management]
    
    E --> I[(Federated Identity Store)]
    F --> J[(Multi-Tenant FHIR Server)]
    G --> K[AI/ML Inference Layer]
    
    F --> L[Interoperability Hub]
    L --> M[HL7 FHIR Gateway]
    L --> N[DICOM Imaging Bridge]
    L --> O[Lab Interface Engine]
    
    K --> P[Medical AI Models]
    P --> Q[Diagnostic Assistant]
    P --> R[Treatment Recommendations]
    
    S[Compliance Framework]
    S --> T[HIPAA Controls]
    S --> U[GDPR Controls]
    S --> V[SOC2 Controls]
    
    W[Event Stream Platform] --> X[Healthcare Data Lake]
    F --> W
    G --> W
    
    X --> Y[Population Health Analytics]
    X --> Z[Research Database]
    
    AA[Disaster Recovery] -.->|Replication| J
    
    style A fill:#3B82F6
    style D fill:#F4C300
    style K fill:#E23D28`
    }
  },
  {
    industry: "ecommerce",
    scales: {
      "Startup": `graph TD
    A[Web Storefront] --> B[API Gateway]
    B --> C[User Authentication]
    B --> D[Product Catalog]
    B --> E[Shopping Cart]
    B --> F[Order Processing]
    
    C --> G[(User Database)]
    D --> H[(Product Database)]
    E --> I[(Session Store)]
    F --> J[(Order Database)]
    
    F --> K[Payment Gateway]
    K --> L[Payment Processor]
    
    F --> M[Inventory Management]
    M --> N[Fulfillment Service]
    
    style A fill:#3B82F6
    style B fill:#F4C300
    style K fill:#E23D28`,

      "Growth": `graph TD
    A[Multi-Platform Frontend] --> B[CDN]
    B --> C[Load Balancer]
    C --> D[API Gateway Cluster]
    
    D --> E[Identity Service]
    D --> F[Catalog Service]
    D --> G[Cart Service]
    D --> H[Order Service]
    D --> I[Search Service]
    
    E --> J[(User DB)]
    F --> K[(Product DB)]
    G --> L[(Cache Layer)]
    H --> M[(Order DB)]
    I --> N[Search Index]
    
    H --> O[Payment Orchestration]
    O --> P[Payment Providers]
    
    H --> Q[Inventory System]
    Q --> R[Warehouse Management]
    R --> S[Shipping Integration]
    
    T[Recommendation Engine] --> F
    T --> U[ML Model Service]
    
    V[Message Queue] --> H
    V --> Q
    
    style A fill:#3B82F6
    style D fill:#F4C300
    style T fill:#E23D28`,

      "Enterprise": `graph TD
    A[Omnichannel Experience] --> B[Global CDN]
    B --> C[Geo-Distributed Load Balancer]
    C --> D[API Gateway Mesh]
    
    D --> E[Customer Identity Platform]
    D --> F[Product Information Management]
    D --> G[Order Management System]
    D --> H[Personalization Engine]
    
    E --> I[(Customer Data Platform)]
    F --> J[(Multi-Region Catalog)]
    G --> K[(Distributed Order DB)]
    
    H --> L[AI Recommendation System]
    L --> M[Real-Time Personalization]
    L --> N[Dynamic Pricing]
    
    G --> O[Payment Orchestration Hub]
    O --> P[Multi-Currency Processing]
    O --> Q[Fraud Detection]
    
    G --> R[Fulfillment Network]
    R --> S[Warehouse Automation]
    R --> T[Last-Mile Delivery]
    R --> U[Returns Management]
    
    V[Event Streaming] --> W[Data Lake]
    G --> V
    H --> V
    
    W --> X[Customer Analytics]
    W --> Y[Supply Chain Optimization]
    
    Z[Search & Discovery]
    Z --> AA[Semantic Search]
    Z --> AB[Visual Search]
    
    style A fill:#3B82F6
    style D fill:#F4C300
    style L fill:#E23D28`
    }
  }
];

export const generateArchitectureDiagram = (industry: string, scale: string): string => {
  // Normalize industry input
  const normalizedIndustry = industry.toLowerCase().replace(/[^a-z]/g, '');

  // Find matching template
  let template = architectureTemplates.find(t =>
    normalizedIndustry.includes(t.industry) || t.industry.includes(normalizedIndustry)
  );

  // Default to a generic template if no match
  if (!template) {
    template = {
      industry: "generic",
      scales: {
        "Startup": `graph TD
    A[Client Application] --> B[API Gateway]
    B --> C[Authentication Service]
    B --> D[Business Logic Layer]
    
    C --> E[(User Database)]
    D --> F[(Application Database)]
    
    D --> G[External Services]
    G --> H[Third-Party APIs]
    
    I[Analytics Module] --> B
    
    style A fill:#3B82F6
    style B fill:#F4C300
    style D fill:#E23D28`,

        "Growth": `graph TD
    A[Multi-Platform Client] --> B[Load Balancer]
    B --> C[API Gateway Cluster]
    
    C --> D[Identity Management]
    C --> E[Core Services]
    C --> F[Integration Layer]
    
    D --> G[(Distributed User DB)]
    E --> H[(Application DB Cluster)]
    
    F --> I[Service Mesh]
    I --> J[External APIs]
    I --> K[Partner Services]
    
    L[Message Queue] --> E
    M[Cache Layer] --> C
    
    N[Analytics Engine] --> O[Data Warehouse]
    E --> N
    
    style A fill:#3B82F6
    style C fill:#F4C300
    style E fill:#E23D28`,

        "Enterprise": `graph TD
    A[Omnichannel Frontend] --> B[Global CDN]
    B --> C[Multi-Region Load Balancer]
    C --> D[API Gateway Mesh]
    
    D --> E[Enterprise Identity Provider]
    D --> F[Microservices Platform]
    D --> G[Integration Hub]
    
    E --> H[(Federated Identity)]
    F --> I[(Multi-Region Database)]
    
    G --> J[Service Orchestration]
    J --> K[Partner Ecosystem]
    J --> L[Legacy System Bridge]
    
    M[Event Streaming Platform] --> N[Data Lake]
    F --> M
    
    N --> O[Analytics & BI]
    N --> P[ML Pipeline]
    
    Q[Monitoring & Observability]
    Q --> R[Distributed Tracing]
    Q --> S[Log Aggregation]
    
    T[Disaster Recovery] -.->|Replication| I
    
    style A fill:#3B82F6
    style D fill:#F4C300
    style F fill:#E23D28`
      }
    };
  }

  // Get the diagram for the specified scale
  const diagram = template.scales[scale] || template.scales["Enterprise"];

  return `\`\`\`mermaid\n${diagram}\n\`\`\``;
};
