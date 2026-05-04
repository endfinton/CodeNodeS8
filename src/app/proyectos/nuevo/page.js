import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, ensureAuthSetup } from "@/lib/auth";
import NuevoProyectoForm from "./NuevoProyectoForm";

export const dynamic = "force-dynamic";

export default async function NuevoProyecto() {
  await ensureAuthSetup();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/proyectos/login");
  }

  return <NuevoProyectoForm />;
}
