import Navbar from '@/components/Navbar';


export const metadata = {
  title: "mystery-feedback",
  description: "drop your valuable feedback",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> 
      {children}
    </div>
  );
}
