import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Market Insight Generator",
    description: "Get AI-powered market insights by providing a niche, region, and target audience.",
  },
  {
    title: "Real-time Report Generation",
    description: "Receive a comprehensive report generated in real-time by our advanced AI models.",
  },
  {
    title: "PDF Report Download",
    description: "Download your generated market insight report as a professional PDF document.",
  },
  {
    title: "Beautiful & Responsive UI",
    description: "Enjoy a clean, modern, and responsive user interface designed for a great user experience.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Application Capabilities
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover what our powerful application can do for you.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <CardTitle className="ml-3">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
