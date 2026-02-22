import React, { useState, useEffect } from 'react';

const SkillsArchitecture = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Listener
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Configuration
  const RX = isMobile ? 160 : 280;
  const RX_INNER = RX - 40;
  const RY = isMobile ? 60 : 90;
  const RY_INNER = RY - 20;
  
  const SVG_WIDTH = isMobile ? 400 : 1200;
  // Increase height for mobile vertical stack
  const SVG_HEIGHT = isMobile ? 1200 : 1000; 
  const VIEWBOX_Y = isMobile ? 0 : -50;

  /* 
    PLAN: 
    Desktop: 1-2-2-2 Layout
    Mobile: 1-1-1-1-1-1-1 (Vertical Stack)
  */

  const getCategories = (mobile) => {
    // Shared Skills Data with Icons
    // Using reliable CDN links for SVGs. 
    // Selected icons that have white text/elements or work on dark backgrounds.
    const cloudSkills = [
      { name: "GCP", icon: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" }, // Multicolor G works on dark
      { name: "AWS", icon: "https://upload.wikimedia.org/wikipedia/commons/7/7c/AWS_Simple_Icons_Cloud_Compute_Amazon_EC2_Instance.svg" }, // Orange EC2 icon works on dark
      { name: "Azure", icon: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" }, // Blue A works OK on dark slate
      { name: "vSphere", icon: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Vmware.svg" } // Text is dark, might need handling
    ];
    
    // AWS alternative for dark mode: https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg (Black text) -> bad.
    // Better AWS: "Comute" icon or white logo. 
    // Let's use the AWS "Smile" logo in white if possible, or standard AWS orange icon.
    // The previous AWS logo was the full text one. Let's try the simple "Smile" or just "AWS" text in white.
    // Actually, let's use the official square icons which often have borders or specific colors.
    
    const cloudSkillsDarkMode = [
       { name: "GCP", icon: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" },
       { name: "AWS", icon: "https://www.logo.wine/a/logo/Amazon_Web_Services/Amazon_Web_Services-Logo.wine.svg" }, // Often has white text variation or just use the icon
       { name: "Azure", icon: "https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg" },
       { name: "vSphere", icon: "https://www.vectorlogo.zone/logos/vmware/vmware-icon.svg" }
    ];

    // UPDATED ICONS:
    // AWS: Using "Amazon_Web_Services_Logo.svg" usually has black text. 
    // Let's try to find a white version or handle it via CSS filter invert in the component.
    // PROPOSAL: Use the same icons but apply 'filter: invert(1)' or 'brightness(0) invert(1)' in CSS when in dark mode IF the icon needs it.
    // However, finding a white AWS logo is 
    // AWS: https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1024px-Amazon_Web_Services_Logo.svg.png
    // Let's use the "AWS" simple icon which is often orange/white.
    
    const skillsList = [
      { name: "GCP", icon: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" },
      { name: "AWS", icon: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/aws-icon.svg" }, 
      { name: "Azure", icon: "https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg" },
      { name: "vSphere", icon: "https://icon.icepanel.io/Technology/svg/vSphere.svg" }
    ];

    if (mobile) {
      // VERTICAL STACK FOR MOBILE
      const centerX = SVG_WIDTH / 2;
      const startY = 100;
      const gapY = 160; // Slightly tighter gap
      
      const aiSkills = [
        { name: "Vertex AI", icon: "https://icon.icepanel.io/GCP/svg/Vertex-AI.svg" },
        { name: "SageMaker", icon: "https://icon.icepanel.io/AWS/svg/Machine-Learning/SageMaker.svg" },
        { name: "Azure AI", icon: "https://az-icons.com/export/icons/bdba2064be58a6b30881bfaddcf6e29d.svg" },
        { name: "HGX/DGX", icon: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg" },
        { name: "Kubeflow", icon: "https://hexmos.com/freedevtools/svg_icons/kubeflow/kubeflow-original.svg" }
      ];

      
      // DevOps Skills (9 items - split into two rows for cleaner layout)
      const devOpsSkills = [
        { name: "Jenkins", icon: "https://www.vectorlogo.zone/logos/jenkins/jenkins-icon.svg" },
        { name: "Az DevOps", icon: "https://az-icons.com/export/icons/d4346f5a054abfb8cb3256599aebf469.svg" },
        { name: "GH Actions", icon: "https://www.vectorlogo.zone/logos/github/github-icon.svg" },
        { name: "ArgoCD", icon: "https://icon.icepanel.io/Technology/svg/Argo-CD.svg" },
        { name: "Helm", icon: "https://icon.icepanel.io/Technology/svg/Helm.svg" },
        { name: "Ansible", icon: "https://www.vectorlogo.zone/logos/ansible/ansible-icon.svg" },
        { name: "IBM UCD", icon: "https://www.vectorlogo.zone/logos/ibm/ibm-icon.svg" }, // Generic IBM for UCD
        { name: "Jira", icon: "https://www.vectorlogo.zone/logos/atlassian_jira/atlassian_jira-icon.svg" },
        { name: "Git", icon: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" }
      ];

      
      // Orchestration Skills (6 items)
      const orchestrationSkills = [
        { name: "Kubernetes", icon: "https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg" },
        { name: "Docker", icon: "https://www.vectorlogo.zone/logos/docker/docker-icon.svg" },
        { name: "Istio", icon: "https://www.vectorlogo.zone/logos/istioio/istioio-icon.svg" },
        { name: "Anthos", icon: "https://icon.icepanel.io/GCP/svg/Anthos.svg" }, // Anthos Service Mesh / Anthos
        { name: "Traefik", icon: "https://icon.icepanel.io/Technology/svg/Traefik-Mesh.svg" },
        { name: "OpenShift", icon: "https://www.vectorlogo.zone/logos/openshift/openshift-icon.svg" }
      ];

      // Data & Persistence (8 items) -> 2 rows
      const dataSkills = [
        { name: "PostgreSQL", icon: "https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg" },
        { name: "MySQL", icon: "https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg" },
        { name: "MongoDB", icon: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" },
        { name: "DynamoDB", icon: "https://icon.icepanel.io/AWS/svg/Database/DynamoDB.svg" },
        { name: "Cassandra", icon: "https://www.vectorlogo.zone/logos/apache_cassandra/apache_cassandra-icon.svg" },
        { name: "MS SQL", icon: "https://www.svgrepo.com/show/303229/microsoft-sql-server-logo.svg" }, // Reliable source for SQL server
        { name: "BigQuery", icon: "https://icon.icepanel.io/GCP/svg/BigQuery.svg" },
        { name: "Snowflake", icon: "https://www.vectorlogo.zone/logos/snowflake/snowflake-icon.svg" }
      ];

      // Observability Skills (9 items)
      const observabilitySkills = [
        { name: "Prometheus", icon: "https://icon.icepanel.io/Technology/svg/Prometheus.svg" },
        { name: "Grafana", icon: "https://www.vectorlogo.zone/logos/grafana/grafana-icon.svg" },
        { name: "Splunk", icon: "https://www.vectorlogo.zone/logos/splunk/splunk-icon.svg" },
        { name: "Datadog", icon: "https://www.vectorlogo.zone/logos/datadoghq/datadoghq-icon.svg" },
        { name: "New Relic", icon: "https://www.vectorlogo.zone/logos/newrelic/newrelic-icon.svg" },
        { name: "Nagios", icon: "https://www.vectorlogo.zone/logos/nagios/nagios-icon.svg" },
        { name: "GCP Mon", icon: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" },
        { name: "CloudWatch", icon: "https://www.vectorlogo.zone/logos/amazon_cloudwatch/amazon_cloudwatch-icon.svg" }, // Usually orange/pink
        // { name: "Az Monitor", icon: "https://az-icons.com/export/icons/227729af9ea80e3e85ca0beb68343780.svg" },
        { name: "Wiz", icon: "https://cdn.worldvectorlogo.com/logos/wiz-1.svg" }
      ];

      // Dev & Scripting (5 items)
      const devScriptingSkills = [
        { name: "Python", icon: "https://www.vectorlogo.zone/logos/python/python-icon.svg" },
        { name: "Java", icon: "https://www.vectorlogo.zone/logos/java/java-icon.svg" },
        { name: "Groovy", icon: "https://icon.icepanel.io/Technology/svg/Apache-Groovy.svg" },
        { name: "Bash", icon: "https://icon.icepanel.io/Technology/svg/Bash.svg" }, // Bash
        { name: "PowerShell", icon: "https://icon.icepanel.io/Technology/svg/Powershell.svg" }
      ];

      // Systems & Servers (8 items) -> 2 rows
      const systemsSkills = [
        { name: "Linux", icon: "https://www.vectorlogo.zone/logos/linux/linux-icon.svg" },
        { name: "RHEL", icon: "https://icon.icepanel.io/Technology/svg/Red-Hat.svg" },
        { name: "Ubuntu", icon: "https://www.vectorlogo.zone/logos/ubuntu/ubuntu-icon.svg" },
        { name: "CentOS", icon: "https://icon.icepanel.io/Technology/svg/CentOS.svg" },
        { name: "Windows", icon: "https://icon.icepanel.io/Technology/svg/Windows-11.svg" },
        { name: "Nginx", icon: "https://www.vectorlogo.zone/logos/nginx/nginx-icon.svg" },
        { name: "HAProxy", icon: "https://www.vectorlogo.zone/logos/haproxy/haproxy-icon.svg" },
        { name: "Tomcat", icon: "https://www.vectorlogo.zone/logos/apache_tomcat/apache_tomcat-icon.svg" }
      ];

      return [
        { id: "cloud_virt", title: "Cloud & Virtualization", color: "#ec4899", cx: centerX, cy: startY, skills: skillsList },
        { id: "ai_hpc", title: "AI & HPC", color: "#d946ef", cx: centerX, cy: startY + gapY, skills: aiSkills },
        { id: "devops", title: "DevOps & Automation", color: "#3b82f6", cx: centerX, cy: startY + gapY * 2, skills: devOpsSkills },
        { id: "containers", title: "Orchestration", color: "#6366f1", cx: centerX, cy: startY + gapY * 3, skills: orchestrationSkills },
        // Need to insert Observability here?
        { id: "observability", title: "Observability", color: "#8b5cf6", cx: centerX, cy: startY + gapY * 4, skills: observabilitySkills },
        { id: "data", title: "Data & Persistence", color: "#a855f7", cx: centerX, cy: startY + gapY * 5, skills: dataSkills },
        { id: "systems", title: "Systems & Servers", color: "#06b6d4", cx: centerX, cy: startY + gapY * 6, skills: systemsSkills }, 
        { id: "dev_scripting", title: "Dev & Scripting", color: "#14b8a6", cx: centerX, cy: startY + gapY * 7, skills: devScriptingSkills },
      ];
    } else {
        // ORIGINAL DESKTOP LAYOUT
        
        const aiSkills = [
            { name: "Vertex AI", icon: "https://icon.icepanel.io/GCP/svg/Vertex-AI.svg" },
            { name: "SageMaker", icon: "https://icon.icepanel.io/AWS/svg/Machine-Learning/SageMaker.svg" },
            { name: "Azure AI", icon: "https://az-icons.com/export/icons/bdba2064be58a6b30881bfaddcf6e29d.svg" },
            { name: "HGX/DGX", icon: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg" },
            { name: "Kubeflow", icon: "https://hexmos.com/freedevtools/svg_icons/kubeflow/kubeflow-original.svg" }
        ];

        const devOpsSkills = [
            { name: "Jenkins", icon: "https://www.vectorlogo.zone/logos/jenkins/jenkins-icon.svg" },
            { name: "Az DevOps", icon: "https://az-icons.com/export/icons/d4346f5a054abfb8cb3256599aebf469.svg" },
            { name: "GH Actions", icon: "https://www.vectorlogo.zone/logos/github/github-icon.svg" },
            { name: "ArgoCD", icon: "https://icon.icepanel.io/Technology/svg/Argo-CD.svg" },
            { name: "Helm", icon: "https://icon.icepanel.io/Technology/svg/Helm.svg" },
            { name: "Ansible", icon: "https://www.vectorlogo.zone/logos/ansible/ansible-icon.svg" },
            { name: "IBM UCD", icon: "https://www.vectorlogo.zone/logos/ibm/ibm-icon.svg" },
            { name: "Jira", icon: "https://www.vectorlogo.zone/logos/atlassian_jira/atlassian_jira-icon.svg" },
            { name: "Git", icon: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" }
        ];

        // Orchestration Skills (6 items)
        const orchestrationSkills = [
            { name: "Kubernetes", icon: "https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg" },
            { name: "Docker", icon: "https://www.vectorlogo.zone/logos/docker/docker-icon.svg" },
            { name: "Istio", icon: "https://www.vectorlogo.zone/logos/istioio/istioio-icon.svg" },
            { name: "Anthos", icon: "https://icon.icepanel.io/GCP/svg/Anthos.svg" }, 
            { name: "Traefik", icon: "https://icon.icepanel.io/Technology/svg/Traefik-Mesh.svg" },
            { name: "OpenShift", icon: "https://www.vectorlogo.zone/logos/openshift/openshift-icon.svg" }
        ];

        // Observability Skills
        const observabilitySkills = [
            { name: "Prometheus", icon: "https://icon.icepanel.io/Technology/svg/Prometheus.svg" },
            { name: "Grafana", icon: "https://www.vectorlogo.zone/logos/grafana/grafana-icon.svg" },
            { name: "Splunk", icon: "https://www.vectorlogo.zone/logos/splunk/splunk-icon.svg" },
            { name: "Datadog", icon: "https://www.vectorlogo.zone/logos/datadoghq/datadoghq-icon.svg" },
            { name: "New Relic", icon: "https://www.vectorlogo.zone/logos/newrelic/newrelic-icon.svg" },
            { name: "Nagios", icon: "https://www.vectorlogo.zone/logos/nagios/nagios-icon.svg" },
            { name: "CloudWatch", icon: "https://www.vectorlogo.zone/logos/amazon_cloudwatch/amazon_cloudwatch-icon.svg" },
            { name: "Az Monitor", icon: "https://az-icons.com/export/icons/227729af9ea80e3e85ca0beb68343780.svg" },
            { name: "Wiz", icon: "https://cdn.worldvectorlogo.com/logos/wiz-1.svg" }
        ];

        // Data & Persistence (8 items)
        const dataSkills = [
            { name: "PostgreSQL", icon: "https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg" },
            { name: "MySQL", icon: "https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg" },
            { name: "MongoDB", icon: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" },
            { name: "DynamoDB", icon: "https://icon.icepanel.io/AWS/svg/Database/DynamoDB.svg" },
            { name: "Cassandra", icon: "https://www.vectorlogo.zone/logos/apache_cassandra/apache_cassandra-icon.svg" },
            { name: "MS SQL", icon: "https://www.svgrepo.com/show/303229/microsoft-sql-server-logo.svg" },
            { name: "BigQuery", icon: "https://icon.icepanel.io/GCP/svg/BigQuery.svg" },
            { name: "Snowflake", icon: "https://www.vectorlogo.zone/logos/snowflake/snowflake-icon.svg" }
        ];

        // Dev & Scripting (5 items)
        const devScriptingSkills = [
            { name: "Python", icon: "https://www.vectorlogo.zone/logos/python/python-icon.svg" },
            { name: "Java", icon: "https://www.vectorlogo.zone/logos/java/java-icon.svg" },
            { name: "Groovy", icon: "https://icon.icepanel.io/Technology/svg/Apache-Groovy.svg" },
            { name: "Bash", icon: "https://icon.icepanel.io/Technology/svg/Bash.svg" },
            { name: "PowerShell", icon: "https://icon.icepanel.io/Technology/svg/Powershell.svg" }
        ];

        // Systems & Servers (8 items)
        const systemsSkills = [
            { name: "Linux", icon: "https://www.vectorlogo.zone/logos/linux/linux-icon.svg" },
            { name: "RHEL", icon: "https://icon.icepanel.io/Technology/svg/Red-Hat.svg" },
            { name: "Ubuntu", icon: "https://www.vectorlogo.zone/logos/ubuntu/ubuntu-icon.svg" },
            { name: "CentOS", icon: "https://icon.icepanel.io/Technology/svg/CentOS.svg" },
            { name: "Windows", icon: "https://icon.icepanel.io/Technology/svg/Windows-11.svg" },
            { name: "Nginx", icon: "https://www.vectorlogo.zone/logos/nginx/nginx-icon.svg" },
            { name: "HAProxy", icon: "https://www.vectorlogo.zone/logos/haproxy/haproxy-icon.svg" },
            { name: "Tomcat", icon: "https://www.vectorlogo.zone/logos/apache_tomcat/apache_tomcat-icon.svg" }
        ];

        return [
            // --- ROW 1 (TOP CENTER) ---
            { id: "cloud_virt", title: "Cloud & Virtualization", color: "#ec4899", cx: 600, cy: 110, skills: skillsList },
            // --- ROW 2 (LOGIC & DATA) ---
            { id: "ai_hpc", title: "AI & HPC", color: "#d946ef", cx: 310, cy: 320, skills: aiSkills },
            // { id: "devops", title: "DevOps & Automation", color: "#3b82f6", cx: 890, cy: 320, skills: devOpsSkills },
            
            // Wait, we have 4 rows effectively with current layout 1-2-2-2. 
            // Total 7 categories before -> now 8.
            // 8 categories in a 1-2-2-2-1 layout? Or 1-3-3-1?
            // Let's try 1-2-2-3? 
            
            // Row 1: Cloud (1)
            // Row 2: AI (L) + DevOps (R)  -> 2
            // Row 3: Orchestration (L) + Observability (R) -> 2
            // Row 4: Data (L) + Systems (R) + Dev (Center) -> 3? No too crowded.
            
            // Let's do 4 rows of 2? No start is 1.
            // R1: Cloud
            // R2: AI + DevOps
            // R3: Orch + Observability
            // R4: Data + Systems
            // R5: Dev (Bottom Center)
            
            { id: "devops", title: "DevOps & Automation", color: "#3b82f6", cx: 890, cy: 320, skills: devOpsSkills },
            
            // --- ROW 3 ---
            { id: "containers", title: "Orchestration", color: "#6366f1", cx: 310, cy: 560, skills: orchestrationSkills },
            { id: "dev_scripting", title: "Dev & Scripting", color: "#14b8a6", cx: 890, cy: 560, skills: devScriptingSkills },
            
            // --- ROW 4 ---
            { id: "data", title: "Data & Persistence", color: "#a855f7", cx: 310, cy: 800, skills: dataSkills },
            { id: "systems", title: "Systems & Servers", color: "#06b6d4", cx: 890, cy: 800, skills: systemsSkills },
            
            // --- ROW 5 ---
            { id: "observability", title: "Observability", color: "#8b5cf6", cx: 600, cy: 1040, skills: observabilitySkills }
        ];
    }
  };

  const categories = getCategories(isMobile);

  // Helper to calculate absolute positions for all skills to draw connections
  const getAllSkillPositions = () => {
    const positions: any = {};
    
    categories.forEach(layer => {
      const skills = layer.skills || [];
      const total = skills.length;
      const spacing = isMobile ? 50 : 80; // Match render logic

      skills.forEach((skill, i) => {
        let xOffset = 0;
        let yOffset = 0;

        // Same logic as render loop
        if (total > 5) {
            const row1Count = Math.ceil(total / 2);
            const isRow1 = i < row1Count;
            const itemsInThisRow = isRow1 ? row1Count : (total - row1Count);
            
            const rowIndex = isRow1 ? i : (i - row1Count);
            const centerIndexForThisRow = (itemsInThisRow - 1) / 2;
            
            xOffset = (rowIndex - centerIndexForThisRow) * (spacing * 0.9); 
            
            // Vertical offset
            // Default Desktop
            // For DevOps (Total 9), Row 1 is -45, Row 2 is 35. Gap is 80px.
            // Center Y is 0 offset.
            // If we start from Bottom of Row 1 (y = -45 + 22 = -23), and go down 30px, we are at +7.
            // Row 2 starts at +35 - 22 = +13. 
            // So +7 is well above +13. It should be safe?
            // Wait, Row 2 icons are centered at +35. Top edge is +13.
            // If we drop to +7, we are clear.
            
            // However, maybe the gap calculation needs to be more robust.
            // Let's widen the row gap slightly for better clearance if total > 5?
            // Or adjust the escape offset.
            
            yOffset = isRow1 ? -50 : 50; // Increased spacing to 100px gap
            if (isMobile) {
                yOffset = isRow1 ? -35 : 35;
            }
        } else {
            const centerIndex = (total - 1) / 2;
            xOffset = (i - centerIndex) * spacing;
            yOffset = 0;
        }

        positions[skill.name] = {
          x: layer.cx + xOffset,
          y: layer.cy + yOffset,
          color: layer.color
        };
      });
    });
    
    return positions;
  };

  const skillPositions = getAllSkillPositions();

  const connections: any[] = [
    // 1. Infrastructure & Provisioning
    { from: "Ansible", to: "Linux", type: "snake-center" }, 
    { from: "Ansible", to: "Windows", type: "snake-center" },
    { from: "vSphere", to: "Linux", type: "snake-center" }, // Top -> Bottom-Right (Systems)

    // 2. CI/CD & Deployment
    { from: "Jenkins", to: "Docker", curve: "cross-left" }, // DevOps (R2-R) -> Orch (R3-L)
    { from: "GH Actions", to: "Docker", curve: "cross-left" },
    { from: "ArgoCD", to: "Kubernetes", curve: "cross-left" },
    { from: "Helm", to: "Kubernetes", curve: "cross-left" },
    
    // Git Connectivity (DevOps Central)
    { from: "Git", to: "Jenkins", curve: "up-left" },
    { from: "Git", to: "Az DevOps", curve: "up-left" },
    { from: "Git", to: "GH Actions", curve: "up-left" },
    { from: "Git", to: "ArgoCD", curve: "up-left" },
    { from: "Git", to: "Helm", curve: "up-mid" },
    { from: "Git", to: "Ansible", curve: "inner-left" },
    { from: "Git", to: "IBM UCD", curve: "inner-left" },
    { from: "Git", to: "Jira", curve: "inner-left" },

    // 3. Container Orchestration
    { from: "Kubernetes", to: "Docker", curve: "inner-right" },
    { from: "Istio", to: "Kubernetes", curve: "inner-left" },
    { from: "OpenShift", to: "Kubernetes", curve: "down-left" }, // Row 2 to Row 1
    { from: "Anthos", to: "Kubernetes", curve: "down-right" },   // Row 2 to Row 1
    { from: "Traefik", to: "Kubernetes", curve: "down-mid" },    // Row 2 (Middle) to Row 1 (Left)
    { from: "Anthos", to: "GCP", curve: "up-left", type: "snake-center" }, // Orch (R3-L) -> Cloud (R1)

    // Scripting & Automation Links
    { from: "Groovy", to: "Jenkins", curve: "long-up", type: "snake-center" }, // Scripting (R3-R) -> DevOps (R2-R)
    { from: "Bash", to: "Linux", curve: "cross-left-down", type: "snake-center" }, // Scripting (R3-R) -> Systems (R4-R) - Wait, Systems is R4-R.
    // Scripting is R3-R. Systems is R4-R. They are stacked.
    // Bash -> Linux is Downwards. 
    { from: "PowerShell", to: "Windows", curve: "cross-left-down", type: "snake-center" }, 

    // 4. Data & Logic
    { from: "Python", to: "PostgreSQL", curve: "cross-left-down", type: "snake-center" }, // Dev (R3-R) -> Data (R4-L)
    { from: "Java", to: "MySQL", curve: "cross-left-down", type: "snake-center" },
    { from: "Vertex AI", to: "BigQuery", curve: "long-down", type: "snake-center" }, // AI (R2-L) -> Data (R4-L)
    { from: "Kubeflow", to: "Kubernetes", type: "snake-center" }, // AI (R2-L) -> Orch (R3-L)
    
    // Database Cloud Integration
    { from: "PostgreSQL", to: "GCP", type: "snake-center" },
    { from: "PostgreSQL", to: "AWS", type: "snake-center" },
    { from: "PostgreSQL", to: "Azure", type: "snake-center" },
    { from: "PostgreSQL", to: "vSphere", type: "snake-center" },

    { from: "MySQL", to: "GCP", type: "snake-center" },
    { from: "MySQL", to: "AWS", type: "snake-center" },
    { from: "MySQL", to: "Azure", type: "snake-center" },
    { from: "MySQL", to: "vSphere", type: "snake-center" },

    { from: "MongoDB", to: "GCP", type: "snake-center" },
    { from: "MongoDB", to: "AWS", type: "snake-center" },
    { from: "MongoDB", to: "Azure", type: "snake-center" },
    { from: "MongoDB", to: "vSphere", type: "snake-center" },

    { from: "MS SQL", to: "GCP", type: "snake-center" },
    { from: "MS SQL", to: "AWS", type: "snake-center" },
    { from: "MS SQL", to: "Azure", type: "snake-center" },
    { from: "MS SQL", to: "vSphere", type: "snake-center" },

    { from: "DynamoDB", to: "AWS", type: "snake-center" },
    { from: "Cassandra", to: "GCP", type: "snake-center" },

    { from: "Snowflake", to: "GCP", type: "snake-center" },
    { from: "Snowflake", to: "AWS", type: "snake-center" },
    { from: "Snowflake", to: "Azure", type: "snake-center" },
    { from: "Snowflake", to: "vSphere", type: "snake-center" },

    // 5. Cloud Specifics
    { from: "SageMaker", to: "AWS", curve: "up-right", type: "snake-center" }, // AI (R2-L) -> Cloud (R1)
    { from: "Vertex AI", to: "GCP", curve: "up-left", type: "snake-center" },
    { from: "Azure AI", to: "Azure", curve: "up-mid", type: "snake-center" },
    
    // Hardware Acceleration (AI -> Cloud)
    { from: "HGX/DGX", to: "GCP", curve: "up-right", type: "snake-center" },
    { from: "HGX/DGX", to: "AWS", curve: "up-right", type: "snake-center" },
    { from: "HGX/DGX", to: "Azure", curve: "up-right", type: "snake-center" },
    { from: "HGX/DGX", to: "vSphere", curve: "up-right", type: "snake-center" },

    // 6. Systems & Servers (Intra-Group)
    { from: "Linux", to: "RHEL", curve: "inner-right" },
    { from: "Linux", to: "Ubuntu", curve: "inner-right" },
    { from: "Linux", to: "CentOS", curve: "inner-right" },
    { from: "Linux", to: "Nginx", curve: "inner-right" },
    { from: "Linux", to: "HAProxy", curve: "inner-right" }, 
    { from: "Linux", to: "Tomcat", curve: "inner-right" },
    { from: "Windows", to: "HAProxy", curve: "inner-right" },
    { from: "Windows", to: "Tomcat", curve: "inner-right" },

    // 7. Observability & Monitoring
    { from: "Prometheus", to: "Grafana", curve: "inner-right" }, // Local
    
    // Cloud Native Monitoring
    { from: "AWS", to: "CloudWatch", type: "snake-center" },
    { from: "Azure", to: "Az Monitor", type: "snake-center" },

    // Observability -> Cloud Providers (Matrix)
    // Prometheus
    { from: "GCP", to: "Prometheus", type: "snake-center" },
    { from: "AWS", to: "Prometheus", type: "snake-center" },
    { from: "Azure", to: "Prometheus", type: "snake-center" },
    { from: "vSphere", to: "Prometheus", type: "snake-center" },

    // Splunk
    { from: "GCP", to: "Splunk", type: "snake-center" },
    { from: "AWS", to: "Splunk", type: "snake-center" },
    { from: "Azure", to: "Splunk", type: "snake-center" },
    { from: "vSphere", to: "Splunk", type: "snake-center" },

    // Datadog
    { from: "GCP", to: "Datadog", type: "snake-center" },
    { from: "AWS", to: "Datadog", type: "snake-center" },
    { from: "Azure", to: "Datadog", type: "snake-center" },
    { from: "vSphere", to: "Datadog", type: "snake-center" },

    // New Relic
    { from: "GCP", to: "New Relic", type: "snake-center" },
    { from: "AWS", to: "New Relic", type: "snake-center" },
    { from: "Azure", to: "New Relic", type: "snake-center" },
    { from: "vSphere", to: "New Relic", type: "snake-center" },

    // Nagios
    { from: "GCP", to: "Nagios", type: "snake-center" },
    { from: "AWS", to: "Nagios", type: "snake-center" },
    { from: "Azure", to: "Nagios", type: "snake-center" },
    { from: "vSphere", to: "Nagios", type: "snake-center" },

    // Wiz
    { from: "GCP", to: "Wiz", type: "snake-center" },
    { from: "AWS", to: "Wiz", type: "snake-center" },
    { from: "Azure", to: "Wiz", type: "snake-center" },
    { from: "vSphere", to: "Wiz", type: "snake-center" }
  ];

  // Helper to distribute points in an ellipse
  const distributeSkills = (skills, cx, cy, rx, ry) => {
    if (!skills || skills.length === 0) return [];
    
    // Simple grid-like distribution tailored for an oval
    // Row 1: 3 items
    // Row 2: 2 items
    // Row 3: 2 items
    const rows = [
      { yOffset: -ry * 0.3, items: skills.slice(0, 3) },
      { yOffset: 0, items: skills.slice(3, 5) },
      { yOffset: ry * 0.35, items: skills.slice(5, 7) }
    ];

    return rows.map((row) => {
      const totalWidth = rx * 1.2; // Use 60% of width
      const spacing = totalWidth / (row.items.length + 1);
      
      return row.items.map((skill, i) => ({
        text: skill,
        x: cx - (totalWidth/2) + (spacing * (i + 1)),
        y: cy + row.yOffset
      }));
    }).flat();
  };

  return (
    <div className="w-full flex justify-center overflow-visible mt-0 px-4 md:px-0">
      <svg 
        viewBox={`0 ${VIEWBOX_Y + 15} ${SVG_WIDTH} ${SVG_HEIGHT}`} 
        className="w-full max-w-[1000px] h-auto overflow-visible pointer-events-auto"
      >
        <style>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
            transform-origin: center;
          }
          @keyframes dash-flow {
            to { stroke-dashoffset: -20; }
          }
          .animate-flow {
            animation: dash-flow 1s linear infinite;
          }
           @keyframes packet-travel {
            0% { offset-distance: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { offset-distance: 100%; opacity: 0; }
          }
        `}</style>
        <defs>
          <filter id="glow-layer" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="25" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {categories.map((layer) => (
          <g key={layer.id} className="group transition-all duration-500 hover:opacity-100 opacity-90">
            
            {/* 1. Base Plate */}
            <ellipse 
              cx={layer.cx} 
              cy={layer.cy} 
              rx={RX} 
              ry={RY} 
              stroke={layer.color}
              strokeWidth="1"
              strokeOpacity="0.2"
              fill="currentColor"
              className="transition-colors duration-300 text-white dark:text-slate-950"
            />

            {/* 2. Grid Pattern (Static Background) */}
            <ellipse 
              cx={layer.cx} 
              cy={layer.cy} 
              rx={RX} 
              ry={RY} 
              fill="none" 
              stroke={layer.color} 
              strokeWidth="0.5"
              strokeOpacity="0.2"
              strokeDasharray="4,8"
            />

            {/* 3. Glowing Rim */}
            <ellipse 
              cx={layer.cx} 
              cy={layer.cy} 
              rx={RX + 5} 
              ry={RY + 3} 
              fill="none" 
              stroke={layer.color} 
              strokeWidth="3" 
              strokeOpacity="0.4"
              filter="url(#glow-layer)"
              className="transition-all duration-300 group-hover:strokeOpacity-80"
            />

            {/* TOP CONSOLE BOX */}
            { !layer.skills?.length || (layer.skills.length <= 5) ? (
            <g>
              {/* Rectangular "Console" sticking out top 
                  ONLY SHOW IF skills list is small or empty to avoid clutter
                  OR move it higher? 
                  
                  Actually, if we have a lot of items (like DevOps), the items might overlap the title box.
                  Let's move the title box UP if we have > 5 items.
              */}
              <rect 
                x={layer.cx - (isMobile ? 80 : 120)} 
                y={layer.cy - RY - (isMobile ? 20 : 35)} 
                width={isMobile ? 160 : 240} 
                height={isMobile ? 36 : 50} 
                rx="8" 
                stroke={layer.color} 
                strokeWidth="2" 
                fill="currentColor"
                // Using Tailwind text colors for fill due to currentColor
                className="shadow-xl transition-colors duration-300 text-white dark:text-slate-950"
              />
              {/* Inner Highlight Line */}
              <rect 
                x={layer.cx - (isMobile ? 70 : 110)} 
                y={layer.cy - RY - (isMobile ? 12 : 25)} 
                width={isMobile ? 140 : 220} 
                height={isMobile ? 20 : 30} 
                rx="4" 
                fill={layer.color} 
                fillOpacity="0.15"
              />
              {/* Title Text */}
              <text 
                x={layer.cx} 
                y={layer.cy - RY - (isMobile ? 2 : 5)} 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fontSize={isMobile ? "12" : "16"} 
                fontWeight="bold" 
                fontFamily="sans-serif"
                fill="currentColor"
                className="pointer-events-none tracking-wide drop-shadow-md text-slate-900 dark:text-white transition-colors duration-300"
              >
                {layer.title}
              </text>
            </g>
            ) : (
             // ALTERNATIVE TITLE POSITION FOR CROWDED LAYERS (DevOps)
             // Move the title box WAY UP or to the Bottom? 
             // Moving it up further above the oval (-40 more pixels)
             // FIX: Only move slightly up (-25) to keep it connected but clear.
             // Original was -20.
            <g>
               <rect 
                x={layer.cx - (isMobile ? 80 : 120)} 
                y={layer.cy - RY - (isMobile ? 25 : 35)} 
                width={isMobile ? 160 : 240} 
                height={isMobile ? 36 : 50} 
                rx="8" 
                stroke={layer.color} 
                strokeWidth="2" 
                fill="currentColor"
                className="shadow-xl transition-colors duration-300 text-white dark:text-slate-950"
              />
              <rect 
                x={layer.cx - (isMobile ? 70 : 110)} 
                y={layer.cy - RY - (isMobile ? 18 : 25)} 
                width={isMobile ? 140 : 220} 
                height={isMobile ? 20 : 30} 
                rx="4" 
                fill={layer.color} 
                fillOpacity="0.15"
              />
              <text 
                x={layer.cx} 
                y={layer.cy - RY - (isMobile ? 8 : 10)} 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fontSize={isMobile ? "12" : "16"} 
                fontWeight="bold" 
                fill="currentColor"
                className="pointer-events-none tracking-wide drop-shadow-md text-slate-900 dark:text-white"
              >
                {layer.title}
              </text>
            </g>
            )}

            {/* 4. Static Ring (Frozen Animation) */}
            <g style={{ 
              transform: `translate(${layer.cx}px, ${layer.cy}px)` 
            }}>
               <g style={{ transformOrigin: 'center', transformBox: 'fill-box' }}>
                  <ellipse 
                    cx={0} 
                    cy={0} 
                    rx={RX - 10} 
                    ry={RY - 5} 
                    fill="none" 
                    stroke={layer.color} 
                    strokeWidth="2"
                    strokeDasharray="10, 15"
                    strokeOpacity="0.6"
                  />
               </g>
            </g>

             {/* 5. Skills List (if present) */}
            {layer.skills && (
              <g className="skills-group pointer-events-none opacity-100 transition-opacity duration-300">
                {layer.skills.map((skill, i) => {
                  /* 
                     Single Row Layout for 4 items:
                     i = 0, 1, 2, 3
                     Center is between 1 and 2.
                     Offsets: -1.5, -0.5, +0.5, +1.5 units from center.
                  */
                  
                  // Spacing between items
                  const spacing = isMobile ? 50 : 80;
                  
                  // Calculate X offset: (index - (total-1)/2) * spacing
                  // For 4 items: (i - 1.5) * spacing
                  
                  const total = layer.skills.length;
                  let xOffset = 0;
                  let yOffset = 0;

                  // Custom Multi-row logic for large lists (like DevOps = 9)
                  if (total > 5) {
                      // Split into 2 rows.
                      // Row 1: Top half (ceil)
                      // Row 2: Bottom half (floor)
                      const row1Count = Math.ceil(total / 2); // e.g. 5
                      // const row2Count = total - row1Count;    // e.g. 4
                      
                      const isRow1 = i < row1Count;
                      const itemsInThisRow = isRow1 ? row1Count : (total - row1Count);
                      const centerIndexForThisRow = (itemsInThisRow - 1) / 2;
                      
                      // Identify index relative to row (0..4 for row 1, 0..3 for row 2)
                      const indexInRow = isRow1 ? i : (i - row1Count);
                      
                      // Spacing needs to be tighter for 9 items if mobile?
                      xOffset = (indexInRow - centerIndexForThisRow) * (spacing * 0.9); 
                      
                      // Increase vertical gap to prevent overlap
                      // Top row moves up more (-35), Bottom moves down more (+40)
                      yOffset = isRow1 ? -45 : 35; 
                      
                      if (isMobile) {
                          yOffset = isRow1 ? -30 : 25;
                      }

                  } else {
                      // Single Row Center Logic
                      const centerIndex = (total - 1) / 2;
                      xOffset = (i - centerIndex) * spacing;
                      yOffset = 0;
                  }

                  return (
                    <g key={skill.name} transform={`translate(${layer.cx + xOffset}, ${layer.cy + yOffset})`}>
                       {/* 
                          Background Container:
                       */}
                       <rect 
                          x="-22" y="-22" width="44" height="44" rx="10"
                          fill="white" fillOpacity="0.95"
                          stroke={layer.color} strokeWidth="2"
                          className="filter drop-shadow-md"
                       />
                       
                       {/* Icon Image */}
                       <image
                          href={skill.icon}
                          x="-18" y="-18"
                          width="36" height="36"
                          preserveAspectRatio="xMidYMid meet"
                       />
                       
                       {/* Label Text - Below */}
                       <text 
                          x="0" y="34" 
                          textAnchor="middle" 
                          dominantBaseline="middle" 
                          fontSize="10"
                          fontWeight="bold"
                          fill="currentColor"
                          className="text-slate-900 dark:text-white drop-shadow-md"
                        >
                          {skill.name}
                        </text>
                    </g>
                  );
                })}
              </g>
            )}

            {/* Always visible Skills (optional: if you want them always visible, remove group-hover:opacity-100 above) 
                For now, making them always visible for better UX or on hover?
                User demand: "Show the skills list". Usually implies always visible.
                Let's make them always visible but subtle, or distinct.
            */}
          </g>
        ))}

        {/* Connections Layer (Foreground) */}
        <g className="connections-layer pointer-events-none data-connections">
          {connections.map((conn, idx) => {
            const start = skillPositions[conn.from];
            const end = skillPositions[conn.to];
            
            if (!start || !end) return null;

            // Simple line if no curve, or Curved Path if specified
            // Use snake-center logic if type matches OR if curve implies heavy crossing
            // REMOVED 'up-' check because local connections (like Git -> Jenkins) also use 'up-' but should stay inside.
            // Snake connections MUST specify type="snake-center" explicitly.
            const useSnakeLogic = conn.type === "snake-center" || 
                                conn.curve?.includes("cross") ||
                                conn.curve?.includes("long-down");

            if (useSnakeLogic) {
                const ICON_RADIUS = 22; // 18px radius + 4px gap
                
                // FORCE BOTTOM START: Always start from bottom of icon
                const startY = start.y + ICON_RADIUS;
                
                // Determine vertical drop to "Gap" or "Escape Zone"
                // For Row 1 items (which are usually higher), we want to drop into the gap between rows.
                // Row 1 y is roughly cy - 45. Gap is around cy. drop ~45px.
                // Row 2 y is roughly cy + 35. Drop down below them?
                // Heuristic: If we are in top row (relative to others in this group), drop meaningful amount.
                // But simplified: Just always drop down 30px first to clear the icon, then turn.
                
                const escapeY = startY + 30; // Move down into the gap (or below the single row)
                
                // Determine center column X for highway
                const centerX = isMobile ? 200 : 600;

                // Adjust Y entry points to center channel
                // We are coming from specific escapeY. 
                // To avoid cutting through other things, let's keep the channel entry near that Y if possible, 
                // or slope gently.
                const centerEntryY = escapeY; // Enter highway at the level we escaped to
                
                // Target Handling
                // Specific override for Cloud skills to always connect at bottom if they are the target
                const isCloudTarget = ["AWS", "GCP", "Azure", "vSphere"].includes(conn.to);
                const isCloudSource = ["AWS", "GCP", "Azure", "vSphere"].includes(conn.from);
                
                // Direction Logic
                const isDownwards = end.y > start.y;
                
                // End Point Logic
                // Default: Top if going down, Bottom if going up.
                // Override: If Cloud is target, ALWAYS hit bottom (+ICON_RADIUS).
                let endY = end.y + (isDownwards ? -ICON_RADIUS : ICON_RADIUS);
                
                if (isCloudTarget) {
                    endY = end.y + ICON_RADIUS;
                }

                // Start Point Logic
                // Force bottom start always (already done by startY = start.y + ICON_RADIUS)
                
                // Control Points for Entry to Target
                // If hitting bottom (endY > end.y), we should come from below.
                const isHittingBottom = endY > end.y;
                const targetEntryY = isHittingBottom ? endY + 40 : endY - 40;
                
                // Define entryY (missing in previous edit)
                const entryY = escapeY + (isDownwards ? 20 : -20);

                // Control Point for final curve
                // If hitting bottom, curve should be below the target.
                const controlCPY = isHittingBottom ? endY + 20 : endY - 20;

                const pathData = `
                  M ${start.x} ${startY}
                  L ${start.x} ${escapeY}
                  Q ${start.x} ${entryY}, ${centerX} ${entryY} 
                  L ${centerX} ${targetEntryY}
                  Q ${centerX} ${controlCPY}, ${end.x} ${controlCPY}
                  L ${end.x} ${endY}
                `;


                return (
                  <g key={idx}>
                    {/* Base Path (Dashed) */}
                    <path 
                      id={`conn-path-${idx}`}
                      d={pathData}
                      fill="none"
                      stroke={isMobile ? "#94a3b8" : "#94a3b8"} 
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      opacity="0.3"
                    />
                    
                    {/* Animated Packet */}
                    <circle r="3" fill={start.color || "#38bdf8"} style={{ filter: `drop-shadow(0 0 8px ${start.color || '#38bdf8'})` }}>
                      <animateMotion dur="6s" repeatCount="indefinite" path={pathData} calcMode="linear" />
                    </circle>

                    {/* Endpoints */}
                    <circle cx={start.x} cy={startY} r="3" fill="#64748b" />
                    <circle cx={end.x} cy={endY} r="3" fill="#64748b" />
                  </g>
                );
            }

            // GENERIC CURVE HANDLER (Simple Quadratic for local connections)
            
            // Adjust offsets for simple curves
            const ICON_RADIUS_H = 24; // slightly larger for horizontal
            const sX = start.x > end.x ? start.x - ICON_RADIUS_H : start.x + ICON_RADIUS_H;
            const eX = end.x > start.x ? end.x - ICON_RADIUS_H : end.x + ICON_RADIUS_H; 
            
            const midX = (sX + eX) / 2;
            const midY = (start.y + end.y) / 2;
            
            // Simple inner arcs
            let curveOffset = 30;
            if (conn.curve === "inner-up" || conn.curve?.includes("up-")) curveOffset = -30;
            if (conn.curve === "inner-flat") curveOffset = 0;
            
            // If vertical distance is large (different rows), reduce the arc intensity 
            if (Math.abs(start.y - end.y) > 40) {
                curveOffset = 0; // Straighter line for vertical jumps
            }

            let curvePath = `M ${sX} ${start.y} Q ${midX} ${midY + (conn.curve === "inner-right" ? 30 : curveOffset)} ${eX} ${end.y}`; 

            if (conn.curve === "long-right") {
               // vSphere -> Linux
               curvePath = `M ${sX} ${start.y} C ${sX + 80} ${start.y}, ${eX + 80} ${end.y}, ${eX} ${end.y}`;
            }

            return (
              <g key={idx}>
                {/* Connection Line */}
                <path 
                  d={curvePath}
                  fill="none"
                  stroke={start.color || "#94a3b8"} 
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  opacity="0.5"
                  className="animate-flow"
                />
                {/* Animated Packet */}
                <circle r="3" fill={start.color || "#38bdf8"} style={{ filter: `drop-shadow(0 0 8px ${start.color || '#38bdf8'})` }}>
                    <animateMotion dur="4s" repeatCount="indefinite" path={curvePath} calcMode="linear" />
                </circle>
                
                {/* Small dot at start/end */}
                <circle cx={sX} cy={start.y} r="3" fill={start.color || "#64748b"} />
                <circle cx={eX} cy={end.y} r="3" fill={end.color || "#64748b"} />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default SkillsArchitecture;
