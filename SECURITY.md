# Security Policy

## Reporting

Please do not open a public issue for a suspected vulnerability.

Report security-sensitive findings privately to the repository owner through GitHub. Include the affected path, reproduction steps, and expected impact.

## Secrets and deployment artifacts

Never commit production credentials, access tokens, customer data, private keys, database exports, or server configuration containing secrets.

Deployment packages should be generated from source when needed rather than used as the source of truth.

## Supported code

Security fixes target the current default branch.
