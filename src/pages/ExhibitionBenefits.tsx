import React from "react";
import type { JSX } from "react";

// Card component implementation
interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className = "", children }) => {
  return (
    <div className={`rounded-lg border bg-card text-card-foreground  bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
};

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({ className = "", children }) => {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
};

// Main component
export const SingleFileSponsorship = (): JSX.Element => {
  const sponsorshipBenefits = [
    "Social media exposure",
    "VIP access",
    "Sponsor recognition",
    "Reels for your stall",
    "Live streaming collaborations",
    "Localized campaigns",
    "Access to attendee data",
    "Access to meet VIP guests",
    "Inclusion in pre-event promotion",
    "Event swag bags",
    "Recognition in press releases",
    "Photo booths and selfies",
    "Participation in panel discussions",
    "Customized photo for stall",
     
  ];



  return (
    <main className="bg-transparent w-screen h-screen min-h-screen min-w-screen overflow-hidden flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 rounded-[80px] bg-[linear-gradient(134deg,rgba(185,238,221,0.2)_0%,rgba(185,238,221,0.44)_100%)] z-0" />
        
        {/* Main content */}
         <div>
          <img src="public/background icon.png"  />
        </div>
        <section className="absolute inset-0 flex flex-col items-center justify-center">
          <header className="[font-family:'Kantumruy_Pro',Helvetica] font-semibold text-black text-[43px] text-center tracking-[0] leading-[normal] whitespace-nowrap mb-8 mt-8">
            Why Sponsorship?
          </header>
          <div className="grid grid-cols-2 gap-x-8 gap-y-[35px]">
            {sponsorshipBenefits.map((benefit, index) => (
              <Card
                key={`benefit-${index}`}
                className="w-[400px] h-[60px]  shadow-none"
              >
                <CardContent className="flex items-center justify-center bg-white rounded-[20px]  h-[60px] px-[40px] py-[2px]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Kantumruy_Pro',Helvetica] font-medium text-black text-[24px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                    {benefit}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
        </section>
      </div>
    </main>
  );
};

// CSS styles as a string (to be added to a style tag)
export const sponsorshipStyles = `
@import url("https://fonts.googleapis.com/css?family=Kantumruy+Pro:500,600");

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;
  --card: transparent;
  --card-foreground: 222.2 47.4% 11.2%;
  --border: 214.3 31.8% 91.4%;
  --radius: 0.5rem;
}

.bg-card {
  background-color: hsl(var(--card));
}

.text-card-foreground { B
  color: hsl(var(--card-foreground));
}

.border {
  border-width: 1px;
  border-color: hsl(var(--border));
}

.rounded-lg {
  border-radius: calc(var(--radius) + 2px);
}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
`;

// Complete App component that can be used standalone
export const CompleteApp = (): JSX.Element => {
  React.useEffect(() => {
    // Inject styles
    const styleElement = document.createElement('style');
    styleElement.textContent = sponsorshipStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return <SingleFileSponsorship />;
};

export default CompleteApp;



// THIS IS AI GENRATE CODE  AND  THIS TYPE OF CODE CAN BE USED FOR CREATING COMPONENTS IN REACT