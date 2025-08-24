import React from "react";
import type { JSX } from "react";

// Card component (reused)
interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className = "", children }) => {
  return (
    <div className={`rounded-lg border bg-card text-card-foreground bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
};

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({ className = "", children }) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
};

// Main Exhibition Component
export const ExhibitionUnder = (): JSX.Element => {
  const exhibitionFeatures = [
    "Showcase your brand",
    "Engage with attendees",
    "Product demonstrations",
    "Networking with industry leaders",
    "Collect leads and contacts",
    "Brand visibility in event marketing",
    "Access to VIP areas",
    "Customizable booth spaces",
    "Press and media coverage",
    "On-site product sales",
    "Sponsor-driven panel participation",
    "Interactive brand activations",
    "Swag and giveaways",
    "Photo & video coverage of your booth",
  ];

  const backgroundIcons = [
    {
      src: "public/images/img_5069181_1.png",
      alt: "Utensils",
      className: "absolute w-[138px] h-[138px] top-0.5 left-[334px]",
    },
    {
      src: "public/images/img_5069181_2.png",
      alt: "Popcorn",
      className: "absolute w-32 h-32 top-0 left-[54px]",
    },
    
    {
      src: "/cake-wedding.svg",
      alt: "Cake wedding",
      className: "absolute w-[133px] h-[133px] top-[22px] left-[896px]",
    },
    {
      src: "/citrus-slice.svg",
      alt: "Citrus slice",
      className: "absolute w-32 h-32 top-[237px] left-6",
    },
    
    {
      src: "/glass-cheers.svg",
      alt: "Glass cheers",
      className: "absolute w-[136px] h-[136px] top-[165px] left-[349px]",
    },
    {
      src: "/grocery-basket.svg",
      alt: "Grocery basket",
      className: "absolute w-[139px] h-[139px] top-[226px] left-[933px]",
    },
    {
      src: "/hamburger-soda.svg",
      alt: "Hamburger soda",
      className: "absolute w-[136px] h-[136px] top-[232px] left-[604px]",
    },
    {
      src: "/holding-hand-dinner.svg",
      alt: "Holding hand dinner",
      className: "absolute w-[141px] h-[141px] top-[267px] left-[1106px]",
    },
    {
      src: "/no-food.svg",
      alt: "No food",
      className: "absolute w-[139px] h-[139px] top-[159px] left-[771px]",
    },
    {
      src: "/pie.svg",
      alt: "Pie",
      className: "absolute w-[140px] h-[140px] top-[261px] left-[250px]",
    },
    {
      src: "/mango.svg",
      alt: "Mango",
      className: "absolute w-[139px] h-[139px] top-[150px] left-[1244px]",
    },
    {
      src: "/burger-fries--1-.svg",
      alt: "Burger fries",
      className: "absolute w-[126px] h-[126px] top-[23px] left-[642px]",
    },
    {
      src: "/cocktail-alt.svg",
      alt: "Cocktail alt",
      className: "absolute w-[131px] h-[131px] top-0.5 left-[1112px]",
    },
    {
      src: "/french-fries.svg",
      alt: "French fries",
      className: "absolute w-[141px] h-[141px] top-2 left-[1326px]",
    },
  ];

  const backgroundImages = [
    {
      src: "/6349468-2.png",
      alt: "Element",
      className:
        "top-[475px] left-[358px] absolute w-[141px] h-[141px] object-cover",
    },
    {
      src: "/12007638-1.png",
      alt: "Element",
      className:
        "absolute w-[141px] h-[141px] top-[347px] left-[457px] object-cover",
    },
    {
      src: "/5074311-2.png",
      alt: "Element",
      className:
        "top-[488px] left-[1212px] absolute w-[141px] h-[141px] object-cover",
    },
    {
      src: "/6349311-1.png",
      alt: "Element",
      className:
        "absolute w-[131px] h-[131px] top-[344px] left-[830px] object-cover",
    },
    {
      src: "/5074433-2.png",
      alt: "Element",
      className:
        "w-[137px] h-[137px] top-[558px] left-[536px] absolute object-cover",
    },
    {
      src: "/5070408-2.png",
      alt: "Element",
      className:
        "top-[441px] left-[1029px] absolute w-[141px] h-[141px] object-cover",
    },
    {
      src: "/5527985-2.png",
      alt: "Element",
      className:
        "w-[137px] h-[137px] top-[633px] left-[1085px] absolute object-cover",
    },
    {
      src: "/16105917-2.png",
      alt: "Element",
      className:
        "top-[516px] left-[826px] absolute w-[133px] h-[133px] object-cover",
    },
    {
      src: "/12948241-1.png",
      alt: "Element",
      className: "absolute w-32 h-32 top-[353px] left-[146px] object-cover",
    },
    {
      src: "/10472876-2.png",
      alt: "Element",
      className:
        "w-[125px] h-[125px] top-[558px] left-[154px] absolute object-cover",
    },
    {
      src: "/6349639-2.png",
      alt: "Element",
      className: "w-32 h-32 top-[394px] left-[698px] absolute object-cover",
    },
    {
      src: "/16105924-2.png",
      alt: "Element",
      className:
        "w-[140px] h-[140px] top-[667px] left-[307px] absolute object-cover",
    },
    {
      src: "/12613371-2.png",
      alt: "Element",
      className:
        "w-[137px] h-[137px] top-[678px] left-[857px] absolute object-cover",
    },
    {
      src: "/5529119-2.png",
      alt: "Element",
      className:
        "w-[139px] h-[139px] top-[673px] left-[623px] absolute object-cover",
    },
    {
      src: "/5069181-2.png",
      alt: "Element",
      className:
        "w-[140px] h-[140px] top-[1051px] absolute left-0 object-cover",
    },
    {
      src: "/6349468-2.png",
      alt: "Element",
      className:
        "top-[1044px] left-[370px] absolute w-[141px] h-[141px] object-cover",
    },
    {
      src: "/5074311-2.png",
      alt: "Element",
      className:
        "top-[1031px] left-[1224px] absolute w-[141px] h-[141px] object-cover",
    },
    {
      src: "/5074433-2.png",
      alt: "Element",
      className:
        "w-[140px] h-[140px] top-[964px] left-[546px] absolute object-cover",
    },
    {
      src: "/5070408-2.png",
      alt: "Element",
      className:
        "top-[1078px] left-[1041px] absolute w-[141px] h-[141px] object-cover",
    },
    {
      src: "/5527985-2.png",
      alt: "Element",
      className:
        "w-[141px] h-[141px] top-[888px] left-[1095px] absolute object-cover",
    },
    {
      src: "/16105917-2.png",
      alt: "Element",
      className:
        "top-[1011px] left-[838px] absolute w-[133px] h-[133px] object-cover",
    },
    {
      src: "/10472876-2.png",
      alt: "Element",
      className:
        "w-[102px] h-[102px] top-[989px] left-[178px] absolute object-cover",
    },
    {
      src: "/6349639-2.png",
      alt: "Element",
      className:
        "w-[141px] h-[141px] top-[1109px] left-[690px] absolute object-cover",
    },
    {
      src: "/16105924-2.png",
      alt: "Element",
      className:
        "w-[121px] h-[121px] top-[862px] left-[328px] absolute object-cover",
    },
    {
      src: "/18597633-2.png",
      alt: "Element",
      className: "top-[859px] left-1.5 absolute w-32 h-32 object-cover",
    },
    {
      src: "/12613371-2.png",
      alt: "Element",
      className:
        "w-[140px] h-[140px] top-[844px] left-[867px] absolute object-cover",
    },
    {
      src: "/5529119-2.png",
      alt: "Element",
      className:
        "w-[137px] h-[137px] top-[849px] left-[637px] absolute object-cover",
    },
    {
      src: "/5069181-2.png",
      alt: "Element",
      className: "w-32 h-32 top-[475px] absolute left-0 object-cover",
    },
    {
      src: "/6349378-1.png",
      alt: "Element",
      className:
        "absolute w-[141px] h-[141px] top-[306px] left-[1325px] object-cover",
    },
    {
      src: "/18597633-2.png",
      alt: "Element",
      className: "top-[673px] left-0 absolute w-32 h-32 object-cover",
    },
    {
      src: "/7409435-2.png",
      alt: "Element",
      className:
        "top-[674px] left-[1320px] absolute w-[141px] h-[141px] object-cover",
    },
    {
      src: "/7409435-2.png",
      alt: "Element",
      className:
        "top-[845px] left-[1332px] absolute w-[141px] h-[141px] object-cover",
    },
  ];

  return (
   <main className="bg-transparent w-screen h-screen min-h-screen min-w-screen overflow-hidden flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 rounded-[80px] bg-[linear-gradient(134deg,rgba(185,238,221,0.2)_0%,rgba(185,238,221,0.44)_100%)] z-0" />
        {/* Background icons */}
        {backgroundIcons.map((icon, index) => (
          <img
            key={`icon-${index}`}
            className={icon.className}
            alt={icon.alt}
            src={icon.src}
            style={{position: 'absolute'}}
          />
        ))}

        {/* Background images */}
        {/* Background images */}
        {backgroundImages.map((image, index) => (
          <img
            key={`bg-image-${index}`}
            className={image.className}
            alt={image.alt}
            src={image.src}
            style={{position: 'absolute'}}
          />
        ))}

        {/* Main content */}
        <section className="absolute inset-0 flex flex-col items-center justify-center">
          <header className="[font-family:'Kantumruy_Pro',Helvetica] font-semibold text-black text-[43px] text-center tracking-[0] leading-[normal] whitespace-nowrap mb-8 mt-8">
            Why Sponsorship?
          </header>
          <div className="grid grid-cols-2 gap-x-8 gap-y-[35px]">
            {exhibitionFeatures.map((feature, index) => (
              <Card
                key={`benefit-${index}`}
                className="w-[400px] h-[60px]  shadow-none"
              >
                <CardContent className="flex items-center justify-center bg-white rounded-[20px]  h-[60px] px-[40px] py-[2px]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Kantumruy_Pro',Helvetica] font-medium text-black text-[24px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                    {feature}
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

// CSS styles (same pattern as Sponsorship)
export const exhibitionStyles = `
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

.text-card-foreground {
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

// Standalone App wrapper
export const CompleteExhibitionApp = (): JSX.Element => {
  React.useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = exhibitionStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return <ExhibitionUnder />;
};

export default CompleteExhibitionApp;
