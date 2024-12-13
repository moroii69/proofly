# Security Policy for Proofly

## Overview

**Proofly** is a robust receipt generator designed to offer professional-grade features, including invoice creation, tax calculations, multi-currency support, PDF exports, bulk generation, and barcode integration. Data security is a cornerstone of this project, ensuring sensitive information is protected throughout all interactions.

## Reporting a Vulnerability

To maintain the integrity of the project, we encourage responsible disclosure of any security vulnerabilities. If you identify an issue, please follow the steps below:

1. **Do not disclose the vulnerability publicly.**  
   Instead, contact the maintainers directly to ensure a prompt resolution.

2. **Submit a report:**  
   - Open an issue on the repository (mark it as sensitive if possible).  
   - Alternatively, send an email to **kurosen930@gmail.com**.  

3. **Include details:**  
   Provide clear steps to reproduce the vulnerability, its potential impact, and any suggested patches or fixes.

## Code Security

We adhere to best practices in secure software development, implementing measures to mitigate common vulnerabilities:

- **Injection Attacks:** Input data is rigorously sanitized before processing.  
- **Cross-Site Scripting (XSS):** All user inputs are escaped to prevent execution of malicious scripts.  
- **Cross-Site Request Forgery (CSRF):** Security tokens are integrated to safeguard against CSRF attacks.

## Dependency Management

The project relies on third-party libraries. To maintain security, we recommend:

- Running `npm audit` regularly to identify and resolve any vulnerabilities in dependencies.
- Monitoring security updates for all third-party libraries and applying patches promptly.

## Secrets Management

Sensitive data, such as API keys and environment variables, must not be included in the repository. Instead:

- Use **GitHub Secrets** or equivalent tools for secure storage.  
- Access secrets through environment variables in your application code.

## Access Control

We enforce strict access control policies to safeguard the project:

- **Branch Protection:** Sensitive branches (e.g., `main`, `production`) are protected by rules requiring reviews and status checks before merging.  
- **Least Privilege Principle:** Collaborator permissions are restricted to minimize access to sensitive components.

## Secure Deployments

To ensure secure and reliable deployments:

- Integrate CI/CD pipelines to run tests and security scans before deploying changes.  
- Enable HTTPS for all environments to secure data during transmission.

## Licensing

This project is licensed under the **MIT License**. For more details, refer to the [LICENSE](LICENSE) file.

## Acknowledgements

We extend our gratitude to contributors and the open-source community for their invaluable support in enhancing the security and quality of this project.
