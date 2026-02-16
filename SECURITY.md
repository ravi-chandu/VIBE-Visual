# Security Policy

## Supported Versions

We release patches for security vulnerabilities. The following versions are currently being supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

The Vibe Visual team takes security seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report

If you discover a security vulnerability, please follow these steps:

1. **Do NOT open a public GitHub issue** for security vulnerabilities
2. **Use GitHub Security Advisories** (preferred method):
   - Go to the [Security tab](https://github.com/ravi-chandu/VIBE-Visual/security)
   - Click "Report a vulnerability"
   - Fill out the form with vulnerability details
3. **Alternative**: Email the maintainer directly
   - Send an email with "SECURITY" in the subject line
   - Include detailed information about the vulnerability

### What to Include

Please provide as much information as possible:

- **Type of vulnerability** (e.g., XSS, data exposure, dependency vulnerability)
- **Affected version(s)** of Vibe Visual
- **Steps to reproduce** the vulnerability
- **Potential impact** of the vulnerability
- **Suggested fix** (if you have one)
- **Your contact information** for follow-up questions

### What to Expect

- **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 48 hours
- **Initial Assessment**: We will provide an initial assessment within 5 business days
- **Updates**: We will keep you informed of our progress toward a fix
- **Resolution Timeline**: We aim to resolve critical vulnerabilities within 30 days
- **Credit**: With your permission, we will credit you in the security advisory and release notes

## Security Best Practices

### For Users

When using Vibe Visual:

- **Keep Updated**: Always use the latest version with security patches
- **Trust Sources**: Only download the visual from official sources (GitHub releases, AppSource)
- **Review Data**: Be mindful of sensitive data you visualize
- **Report Issues**: If you notice unusual behavior, report it immediately

### For Developers/Contributors

When contributing to Vibe Visual:

- **Dependencies**: Keep dependencies up to date and review security advisories
- **Code Review**: All code changes go through review before merging
- **Input Validation**: Always validate data from Power BI DataView
- **No Secrets**: Never commit credentials, API keys, or sensitive data
- **Secure Coding**: Follow OWASP guidelines and TypeScript best practices

## Data Handling Statement

**Vibe Visual does NOT:**
- Send any data to external servers
- Store any data outside of Power BI
- Make any network requests during normal operation
- Access data beyond what's provided through Power BI DataView
- Use cookies or browser storage

**Vibe Visual ONLY:**
- Processes data provided by Power BI within the visual's sandbox
- Renders visualizations using the data in your Power BI report
- Communicates with Power BI framework for cross-filtering and formatting

All data processing happens client-side within your Power BI environment.

## Known Security Considerations

### Visual Sandbox

Power BI custom visuals run in a sandboxed environment with limited capabilities. Vibe Visual respects these boundaries and does not attempt to bypass security restrictions.

### Browser Security

Vibe Visual follows browser security best practices:
- No inline scripts or eval() usage
- Content Security Policy compliant
- No dynamic HTML injection
- SVG rendering only (no iframes or external resources)

### Dependencies

We regularly review and update dependencies. You can check our dependency security status:

```bash
npm audit
```

## Security Updates

Security updates will be:
- Released as soon as a fix is validated
- Announced in release notes and CHANGELOG.md
- Tagged with the `security` label in GitHub
- Documented in GitHub Security Advisories

## Vulnerability Disclosure Policy

We follow **coordinated disclosure**:

1. Vulnerabilities are fixed privately before public disclosure
2. We work with reporters to understand and validate issues
3. We aim to release fixes before public disclosure
4. We credit reporters (with permission) in advisories
5. We provide reasonable time for users to update before full disclosure

## Questions?

If you have questions about security but don't have a vulnerability to report:

- Open a public issue with the `question` label
- Start a discussion in GitHub Discussions
- Email the maintainer

Thank you for helping keep Vibe Visual and its users safe! 🔒
