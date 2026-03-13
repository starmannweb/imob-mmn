"use client";

import { useState } from "react";
import { Search, X, SlidersHorizontal, Home, Building2, MapPin, DollarSign, Bed, Bath, Car, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdvancedSearchProps {
    onSearch?: (filters: any) => void;
    primaryColor?: string;
}

export function AdvancedSearch({ onSearch, primaryColor = "#000000" }: AdvancedSearchProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({
        transaction: 'venda',
        propertyType: '',
        city: '',
        neighborhood: '',
        bedrooms: '',
        bathrooms: '',
        parkingSpaces: '',
        minPrice: '',
        maxPrice: '',
        minArea: '',
        maxArea: '',
        acceptsFinancing: '',
        isMyHouse: '',
        acceptsExchange: '',
        furnished: '',
        condoType: '',
        propertyProfile: '',
        beachfront: ''
    });

    const handleSearch = () => {
        if (onSearch) {
            onSearch(filters);
        }
        setIsOpen(false);
    };

    const handleReset = () => {
        setFilters({
            transaction: 'venda',
            propertyType: '',
            city: '',
            neighborhood: '',
            bedrooms: '',
            bathrooms: '',
            parkingSpaces: '',
            minPrice: '',
            maxPrice: '',
            minArea: '',
            maxArea: '',
            acceptsFinancing: '',
            isMyHouse: '',
            acceptsExchange: '',
            furnished: '',
            condoType: '',
            propertyProfile: '',
            beachfront: ''
        });
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
            >
                <SlidersHorizontal className="w-4 h-4" />
                Mais opções de pesquisa
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8 animate-in fade-in slide-in-from-top-4 duration-300">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Pesquisa de Imóvel</h2>
                                <p className="text-sm text-slate-500 mt-1">Mais opções de pesquisa</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                            {/* Tipo e Subtipo */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Tipo e Subtipo</label>
                                    <select
                                        value={filters.propertyType}
                                        onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    >
                                        <option value="">Selecione</option>
                                        <option value="casa">Casa</option>
                                        <option value="apartamento">Apartamento</option>
                                        <option value="terreno">Terreno</option>
                                        <option value="comercial">Comercial</option>
                                        <option value="rural">Rural</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Dormitórios</label>
                                    <div className="flex gap-2">
                                        {['+1', '+2', '+3', '+4', '+5'].map((num) => (
                                            <button
                                                key={num}
                                                onClick={() => setFilters({ ...filters, bedrooms: num })}
                                                className={`flex-1 px-3 py-2 border rounded-lg font-medium text-sm transition-colors ${
                                                    filters.bedrooms === num
                                                        ? 'bg-blue-600 text-white border-blue-600'
                                                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                                                }`}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Transação */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Transação</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="transaction"
                                            value="venda"
                                            checked={filters.transaction === 'venda'}
                                            onChange={(e) => setFilters({ ...filters, transaction: e.target.value })}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-sm font-medium text-slate-700">Venda</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="transaction"
                                            value="aluguel"
                                            checked={filters.transaction === 'aluguel'}
                                            onChange={(e) => setFilters({ ...filters, transaction: e.target.value })}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-sm font-medium text-slate-700">Aluguel</span>
                                    </label>
                                </div>
                            </div>

                            {/* Sendo suítes */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Sendo suítes</label>
                                <div className="flex gap-2">
                                    {['+1', '+2', '+3', '+4', '+5'].map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => setFilters({ ...filters, bathrooms: num })}
                                            className={`flex-1 px-3 py-2 border rounded-lg font-medium text-sm transition-colors ${
                                                filters.bathrooms === num
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                                            }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Preço */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Preço</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="R$ 0,00"
                                        value={filters.minPrice}
                                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                                        className="px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="R$ 0,00"
                                        value={filters.maxPrice}
                                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                        className="px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>

                            {/* Aceita financiamento */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Aceita financiamento?</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="financing"
                                            value="sim"
                                            checked={filters.acceptsFinancing === 'sim'}
                                            onChange={(e) => setFilters({ ...filters, acceptsFinancing: e.target.value })}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-sm font-medium text-slate-700">Sim</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="financing"
                                            value="nao"
                                            checked={filters.acceptsFinancing === 'nao'}
                                            onChange={(e) => setFilters({ ...filters, acceptsFinancing: e.target.value })}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-sm font-medium text-slate-700">Não</span>
                                    </label>
                                </div>
                            </div>

                            {/* UF e Cidade */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">UF</label>
                                    <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                                        <option value="">UF</option>
                                        <option value="SP">SP</option>
                                        <option value="RJ">RJ</option>
                                        <option value="MG">MG</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Cidade</label>
                                    <select
                                        value={filters.city}
                                        onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    >
                                        <option value="">Cidade</option>
                                        <option value="santos">Santos</option>
                                        <option value="sao-paulo">São Paulo</option>
                                    </select>
                                </div>
                            </div>

                            {/* Garagens */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Garagens</label>
                                <div className="flex gap-2">
                                    {['+1', '+2', '+3', '+4', '+5'].map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => setFilters({ ...filters, parkingSpaces: num })}
                                            className={`flex-1 px-3 py-2 border rounded-lg font-medium text-sm transition-colors ${
                                                filters.parkingSpaces === num
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                                            }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Área */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Área</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Digite..."
                                        value={filters.minArea}
                                        onChange={(e) => setFilters({ ...filters, minArea: e.target.value })}
                                        className="px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Digite..."
                                        value={filters.maxArea}
                                        onChange={(e) => setFilters({ ...filters, maxArea: e.target.value })}
                                        className="px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>

                            {/* Minha casa minha vida */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Minha casa minha vida?</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="myHouse"
                                            value="sim"
                                            checked={filters.isMyHouse === 'sim'}
                                            onChange={(e) => setFilters({ ...filters, isMyHouse: e.target.value })}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-sm font-medium text-slate-700">Sim</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="myHouse"
                                            value="nao"
                                            checked={filters.isMyHouse === 'nao'}
                                            onChange={(e) => setFilters({ ...filters, isMyHouse: e.target.value })}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-sm font-medium text-slate-700">Não</span>
                                    </label>
                                </div>
                            </div>

                            {/* Bairros */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Bairros</label>
                                <select
                                    value={filters.neighborhood}
                                    onChange={(e) => setFilters({ ...filters, neighborhood: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                >
                                    <option value="">Selecione</option>
                                    <option value="centro">Centro</option>
                                    <option value="boqueirão">Boqueirão</option>
                                    <option value="gonzaga">Gonzaga</option>
                                </select>
                            </div>

                            {/* Situação e Mobilidade */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Situação</label>
                                    <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                                        <option value="">Selecione</option>
                                        <option value="novo">Novo</option>
                                        <option value="usado">Usado</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Mobilidade</label>
                                    <select
                                        value={filters.furnished}
                                        onChange={(e) => setFilters({ ...filters, furnished: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    >
                                        <option value="">Selecione</option>
                                        <option value="sim">Sim</option>
                                        <option value="nao">Não</option>
                                    </select>
                                </div>
                            </div>

                            {/* Aceita permuta */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Aceita permuta?</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="exchange"
                                            value="sim"
                                            checked={filters.acceptsExchange === 'sim'}
                                            onChange={(e) => setFilters({ ...filters, acceptsExchange: e.target.value })}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-sm font-medium text-slate-700">Sim</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="exchange"
                                            value="nao"
                                            checked={filters.acceptsExchange === 'nao'}
                                            onChange={(e) => setFilters({ ...filters, acceptsExchange: e.target.value })}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-sm font-medium text-slate-700">Não</span>
                                    </label>
                                </div>
                            </div>

                            {/* Perfil do imóvel e Próximo ao mar */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Perfil do imóvel</label>
                                    <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                                        <option value="">Selecione</option>
                                        <option value="residencial">Residencial</option>
                                        <option value="comercial">Comercial</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Próximo ao mar</label>
                                    <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                                        <option value="">Selecione</option>
                                        <option value="sim">Sim</option>
                                        <option value="nao">Não</option>
                                    </select>
                                </div>
                            </div>

                            {/* Requisito do imóvel e Requisito do condomínio */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Requisito do imóvel</label>
                                    <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                                        <option value="">Selecione</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Requisito do condomínio</label>
                                    <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                                        <option value="">Selecione</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between p-6 border-t border-slate-100 bg-slate-50">
                            <div className="text-sm text-slate-600">
                                <span className="font-bold">0</span> Imóveis encontrados
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    onClick={handleReset}
                                    variant="outline"
                                    className="px-6"
                                >
                                    Limpar filtros
                                </Button>
                                <Button
                                    onClick={handleSearch}
                                    className="px-8 bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <Search className="w-4 h-4 mr-2" />
                                    Pesquisar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
