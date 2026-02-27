# md2pdf

## Overview
md2pdf is a powerful tool designed to convert Markdown files into high-quality PDF documents. It provides users with a seamless experience in transforming their markdown notes, documentation, and other text-based files into printable formats without losing the original styling and structure.

## Features
- **User-Friendly Interface**: Easy to navigate and utilize, making it accessible for all users.
- **Fast Conversion**: Rapidly converts markdown files to PDFs without significant delays.
- **Customizable Themes**: Choose from various themes to personalize the appearance of the final documents.
- **Supports Common Markdown Syntax**: Includes links, images, lists, code, and more.
- **Command-Line Interface**: Allows for batch processing and integration with scripts.

## Live Demo
Visit our live demo at [md2pdf Live Demo](#).

## Technologies
- **Node.js**: For backend processing.
- **Markdown-it**: For parsing markdown content.
- **Puppeteer**: For rendering PDFs from HTML.

## Installation
To install md2pdf, you can use npm:
```bash
npm install -g md2pdf
```

## Usage
To convert a Markdown file to PDF, use the following command:
```bash
md2pdf path/to/your/file.md
```

## Scripts
- **build**: Compiles the application and prepares it for deployment.
- **test**: Runs tests to ensure functionality.
- **start**: Launches the application locally.

## Supported Markdown Features
- Headings (H1, H2, H3)
- Lists (Ordered and Unordered)
- Blockquotes
- Code Blocks
- Links and Images

## Themes and Styles
You can change the theme using command options:
```bash
md2pdf file.md --theme theme-name
```
Available themes include default, dark, and light.

## Customization
For further customization, you can modify the CSS styles by adding your own styles in a separate CSS file and linking it during conversion:
```bash
md2pdf file.md --css path/to/your/custom/styles.css
```

## Deployment
To deploy the application, ensure that your environment has Node.js installed. You can build the application using:
```bash
npm run build
```
Then, you can serve it using any static file hosting service.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas. 
