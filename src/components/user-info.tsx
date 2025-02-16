import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { FaUser } from "react-icons/fa";
import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flow-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flow-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flow-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flow-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.role}
          </p>
        </div>
        <div className="flex flow-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">2FA Status</p>
          <Badge
            variant={user?.twoFactorEnabled ? "success" : "destructive"}
            className="truncate text-xs max-w-[180px] font-mono p-1 rounded-md">
            {user?.twoFactorEnabled ? "Enabled" : "Disabled"}
          </Badge>
        </div>
        <div className="flex flow-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Image</p>
          {user?.image ? (
            <Image src={user?.image} alt="User Image" width={50} height={50} />
          ) : (
            <FaUser className="text-2xl" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
