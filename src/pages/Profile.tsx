import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCircle, MapPin, Sprout, Phone, Mail, Landmark } from "lucide-react";
import { farmerProfile } from "@/lib/mock-data";

const Profile = () => {
  const p = farmerProfile;

  const fields = [
    { label: "Farmer Name", value: p.name, icon: UserCircle },
    { label: "Farm Name", value: p.farmName, icon: Landmark },
    { label: "Location", value: p.location, icon: MapPin },
    { label: "Crop Type", value: p.cropType, icon: Sprout },
    { label: "Field Area", value: p.fieldArea, icon: MapPin },
    { label: "Contact", value: p.contact, icon: Phone },
    { label: "Email", value: p.email, icon: Mail },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Farmer Profile</h1>

      <Card className="max-w-2xl">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <UserCircle className="h-10 w-10 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{p.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{p.farmName}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((f) => (
            <div key={f.label} className="space-y-1">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <f.icon className="h-3.5 w-3.5" /> {f.label}
              </Label>
              <Input value={f.value} readOnly className="bg-muted/50" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
