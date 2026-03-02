export const dynamic = 'force-dynamic';

import { createAdminClient } from "@/utils/supabase/admin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { MapPin, Phone, Mail, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function BrokersLandingPage() {
    const supabase = createAdminClient();

    const { data: brokers } = await supabase
        .from("users")
        .select("id, full_name, avatar_url, phone_whatsapp, referral_code, created_at")
        .limit(20);

    return (
        <div className="bg-slate-50 min-h-screen">
            <header className="bg-blue-600 text-white py-20 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Encontre seu Corretor</h1>
                <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                    Conecte-se com nossa rede especializada de corretores independentes.
                </p>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {brokers && brokers.length > 0 ? (
                        brokers.map((broker) => (
                            <div key={broker.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center hover:shadow-md transition">
                                <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-slate-100">
                                    <AvatarImage src={broker.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${broker.full_name}`} alt={broker.full_name} />
                                    <AvatarFallback>{broker.full_name?.charAt(0)}</AvatarFallback>
                                </Avatar>

                                <h3 className="font-bold text-lg text-slate-900 mb-1">{broker.full_name}</h3>
                                <div className="text-sm text-blue-600 font-semibold mb-4 text-center flex items-center justify-center">
                                    <MapPin className="w-4 h-4 mr-1" /> Corretor Afiliado
                                </div>

                                <div className="flex justify-center gap-3 mb-6">
                                    <a href={`https://wa.me/${broker.phone_whatsapp || '5511999999999'}?text=Olá`} target="_blank" className="bg-slate-100 p-2 rounded-full text-slate-600 hover:text-green-600 hover:bg-green-50 transition">
                                        <Phone className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="bg-slate-100 p-2 rounded-full text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition">
                                        <Mail className="w-4 h-4" />
                                    </a>
                                </div>

                                <Link href={`/corretor/${broker.referral_code || broker.id}`}>
                                    <Button className="w-full bg-slate-900 hover:bg-blue-600 hover:text-white transition-colors">
                                        Ver portfólio
                                    </Button>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-1 md:col-span-2 lg:col-span-4 py-20 text-center flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Ainda não há corretores.</h3>
                            <p className="text-slate-500">Nenhum corretor independente foi registrado na plataforma ainda.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
