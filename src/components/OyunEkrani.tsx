// src/components/OyunEkrani.tsx

import { useState } from 'react';
import { Gorsel } from './Gorsel';

// --- GENİŞLETİLMİŞ OYUN VERİSİ ---
const OYUN_VERISI = [
    // --- İNSAN KATEGORİSİ ---
    {
        id: 1,
        zorluk: 'kolay',
        kategori: 'insan',
        gorseller: [
            { id: 101, url: "https://placehold.co/300x300/FF5733/FFFFFF?text=Gercek+Insan", isAi: false },
            { id: 102, url: "https://placehold.co/300x300/33FF57/FFFFFF?text=AI+Insan+(Bariz)", isAi: true },
            { id: 103, url: "https://placehold.co/300x300/3357FF/FFFFFF?text=Gercek+Insan+2", isAi: false }
        ]
    },
    {
        id: 2,
        zorluk: 'zor',
        kategori: 'insan',
        gorseller: [
            { id: 201, url: "https://placehold.co/300x300/FF5733/FFFFFF?text=Gercek+Portre", isAi: false },
            { id: 202, url: "https://placehold.co/300x300/33FF57/FFFFFF?text=AI+Insan+(Kusursuz)", isAi: true },
            { id: 203, url: "https://placehold.co/300x300/3357FF/FFFFFF?text=Gercek+Portre+2", isAi: false }
        ]
    },
    // --- MANZARA KATEGORİSİ ---
    {
        id: 3,
        zorluk: 'kolay',
        kategori: 'manzara',
        gorseller: [
            { id: 301, url: "https://placehold.co/300x300/FF5733/FFFFFF?text=Gercek+Doga", isAi: false },
            { id: 302, url: "https://placehold.co/300x300/33FF57/FFFFFF?text=AI+Manzara+(Hatalı)", isAi: true },
            { id: 303, url: "https://placehold.co/300x300/3357FF/FFFFFF?text=Gercek+Doga+2", isAi: false }
        ]
    },
    {
        id: 4,
        zorluk: 'zor',
        kategori: 'manzara',
        gorseller: [
            { id: 401, url: "https://placehold.co/300x300/FF5733/FFFFFF?text=Gercek+Dag", isAi: false },
            { id: 402, url: "https://placehold.co/300x300/33FF57/FFFFFF?text=AI+Manzara+(Gercekci)", isAi: true },
            { id: 403, url: "https://placehold.co/300x300/3357FF/FFFFFF?text=Gercek+Deniz", isAi: false }
        ]
    },
    // --- SANAT KATEGORİSİ ---
    {
        id: 5,
        zorluk: 'kolay',
        kategori: 'sanat',
        gorseller: [
            { id: 501, url: "https://placehold.co/300x300/FF5733/FFFFFF?text=Van+Gogh", isAi: false },
            { id: 502, url: "https://placehold.co/300x300/33FF57/FFFFFF?text=AI+Cizim+(Basit)", isAi: true },
            { id: 503, url: "https://placehold.co/300x300/3357FF/FFFFFF?text=Picasso", isAi: false }
        ]
    },
    {
        id: 6,
        zorluk: 'zor',
        kategori: 'sanat',
        gorseller: [
            { id: 601, url: "https://placehold.co/300x300/FF5733/FFFFFF?text=Yagli+Boya", isAi: false },
            { id: 602, url: "https://placehold.co/300x300/33FF57/FFFFFF?text=AI+Sanat+(Detayli)", isAi: true },
            { id: 603, url: "https://placehold.co/300x300/3357FF/FFFFFF?text=Heykel", isAi: false }
        ]
    }
];

interface OyunEkraniProps {
    onOyunBitti: (sonuc: 'kazandi' | 'kaybetti') => void;
    secilenZorluk: string;   // Gerekli Prop
    secilenKategori: string; // Gerekli Prop
}

export const OyunEkrani = ({ onOyunBitti, secilenZorluk, secilenKategori }: OyunEkraniProps) => {
    const [secilenId, setSecilenId] = useState<number | null>(null);
    const [hakSayisi, setHakSayisi] = useState(1);
    const [ipucu, setIpucu] = useState<string>("");
    const [elenenId, setElenenId] = useState<number | null>(null);

    // Seçilen kriterlere göre doğru veri setini buluyoruz
    // find metodu diziyi tarar ve zorluk/kategori eşleşen ilk öğeyi getirir.
    const aktifVeriSeti = OYUN_VERISI.find(veri =>
        veri.zorluk === secilenZorluk && veri.kategori === secilenKategori
    ) || OYUN_VERISI[0]; // Eğer bir hata olur da bulunamazsa varsayılan olarak ilk seti kullan

    const gorseller = aktifVeriSeti.gorseller;

    const gorselSec = (id: number) => {
        setSecilenId(id);
    };

    const cevabiOnayla = () => {
        if (secilenId === null) return;
        const secilenGorsel = gorseller.find(g => g.id === secilenId);
        if (!secilenGorsel) return;

        if (secilenGorsel.isAi) {
            onOyunBitti('kazandi');
        } else {
            if (hakSayisi === 1) {
                setHakSayisi(2);
                setElenenId(secilenId);
                // Zorluk seviyesine göre ipucu metni değişebilir
                const yeniIpucu = secilenZorluk === 'kolay'
                    ? "Yanlış! İpucu: Çok bariz bir hata ara, renkler çok parlak olabilir."
                    : "Yanlış! İpucu: AI genellikle elleri, gölgeleri veya arka plan yazılarını karıştırır.";
                setIpucu(yeniIpucu);
                setSecilenId(null);
            } else {
                onOyunBitti('kaybetti');
            }
        }
    };

    return (
        <div className="oyun-ekrani">
            {/* Oyunun hangi modda olduğunu gösteren bilgi paneli */}
            <div className="oyun-bilgi-paneli">
                <span>Mod: <strong>{secilenKategori.toUpperCase()}</strong></span>
                <span>Zorluk: <strong>{secilenZorluk.toUpperCase()}</strong></span>
            </div>

            <h2>{hakSayisi === 1 ? 'İlk Tahminini Yap!' : 'Son Şansın!'}</h2>
            <p>Hangi görsel yapay zeka tarafından üretilmiştir?</p>

            {ipucu && <div className="ipucu-kutusu">⚠️ {ipucu}</div>}

            <div className="gorsel-alani">
                {gorseller.map((gorsel) => (
                    <Gorsel
                        key={gorsel.id}
                        imageUrl={gorsel.url}
                        isSelected={secilenId === gorsel.id}
                        isDisabled={elenenId === gorsel.id}
                        onClick={() => gorselSec(gorsel.id)}
                    />
                ))}
            </div>

            <div className="buton-alani">
                <button
                    className="onayla-btn"
                    onClick={cevabiOnayla}
                    disabled={secilenId === null}
                >
                    Seçimi Onayla
                </button>
            </div>
        </div>
    );
}