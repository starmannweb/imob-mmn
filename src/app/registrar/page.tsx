import Link from "next/link";
import { signup } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function Register({
    searchParams,
}: {
    searchParams: Promise<{ message?: string, ref?: string }>;
}) {
    const params = await searchParams;
    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto min-h-screen">
            <Link
                href="/"
                className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>{" "}
                Voltar
            </Link>

            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                <h1 className="text-2xl font-bold mb-6 text-center">Criar Conta</h1>

                {params?.ref && (
                    <input type="hidden" name="ref_code" value={params.ref} />
                )}

                <Label htmlFor="full_name">Nome Completo</Label>
                <Input
                    className="mb-4"
                    name="full_name"
                    placeholder="João da Silva"
                    required
                />

                <Label htmlFor="email">Email</Label>
                <Input
                    className="mb-4"
                    name="email"
                    placeholder="seu@email.com"
                    required
                />

                <Label htmlFor="password">Senha</Label>
                <Input
                    className="mb-6"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                />

                <Button formAction={signup} className="w-full bg-blue-600 hover:bg-blue-700">
                    Registrar
                </Button>

                {params?.message && (
                    <p className="mt-4 p-4 bg-red-100 text-red-600 text-center rounded-md">
                        {params.message}
                    </p>
                )}

                <div className="text-center mt-6 text-sm text-slate-600">
                    Já possui conta?{" "}
                    <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                        Fazer login
                    </Link>
                </div>
            </form>
        </div>
    );
}
