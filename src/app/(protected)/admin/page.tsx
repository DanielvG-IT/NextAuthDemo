"use client";

import { Button } from "@/components/ui/button";
import { UserRole } from "@prisma/client";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { admin } from "@/actions/admin";

const AdminPage = () => {
  const onApiRouteClick = async () => {
    await fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("API route accessed successfully!");
      } else {
        toast.error("Failed to access API route!");
      }
    });
  };

  const onServerActionClick = async () => {
    admin().then((res) => {
      if (res.success) {
        toast.success(res.success);
      }

      if (res.error) {
        toast.error(res.error);
      }
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🧑🏻‍💻 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="Messages that admins can see!" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API route</p>
          <Button onClick={onApiRouteClick}>Click to test!</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test!</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
