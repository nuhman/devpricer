# Software Quotation/Proposal Generator 
    
A free online tool for freelancers and small agencies to create professional project proposals and quotations.   
Developers often wants to create project proposals to submit to their potential clients. While there are many proposal generators available online, most of them are paid or not developer focused. 

Live:  https://devpricer.vercel.app  

![og-image-new](https://github.com/user-attachments/assets/ca6027fc-513b-4003-b7a2-ca2e98d05720)

## Features  

- **Multi-step Form**: 
  - Company/Developer & Client Details  
  - Project Components with Pricing  
  
- **Flexible Pricing Options**:
  - Hourly rate calculation
  - Fixed price components
  - Multiple currency support
  
- **Data Management**:  
  - Fully client-side processing; No login required
  - Local storage persistence
  - Data export as PDF  
   
## Generated Proposal PDF Sample  
   
![proposal3](https://github.com/user-attachments/assets/d12e2f46-b8ce-41d4-b327-b6a031813334)
  

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/nuhman/devpricer.git
   ```

2. Install dependencies:
   ```bash
   cd devpricer
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```  

## Usage

1. Fill in your company/freelancer details
2. Add client information
3. Create project components with pricing
4. Preview the generated proposal
5. Download as PDF

## Developer Customization

- You can modify the PDF template in `app/ui/proposaltemplate.tsx`   
- Add new form fields as needed  
- Customize validation rules in `lib/schemas.ts`  
- Add new currencies in `lib/data/currencies.ts`  
  
Contributions are welcome!  

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



