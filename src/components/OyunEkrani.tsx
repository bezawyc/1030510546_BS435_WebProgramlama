// src/components/OyunEkrani.tsx

import { useState } from 'react';
import { Gorsel } from './Gorsel';

const OYUN_VERISI = [
    // --- İNSAN KATEGORİSİ ---
    {
        id: 1,
        zorluk: 'kolay',
        kategori: 'insan',
        gorseller: [
            { id: 101, url: "img/3333.jpg", isAi: false },
            { id: 102, url: "img/1111.jpg", isAi: false },
            { id: 103, url: "img/2222.jpg", isAi: true }
        ]
    },
    {
        id: 2,
        zorluk: 'zor',
        kategori: 'insan',
        gorseller: [
            { id: 201, url: "img/111.jpg", isAi: false },
            { id: 202, url: "img/222.png", isAi: true },
            { id: 203, url: "img/333.jpg", isAi: false }
        ]
    },
    // --- MANZARA KATEGORİSİ ---
    {
        id: 3,
        zorluk: 'kolay',
        kategori: 'manzara',
        gorseller: [
            { id: 301, url: "img/id1.jpg", isAi: false },
            { id: 302, url: "img/id2.jpg", isAi: true },
            { id: 303, url: "img/id3.jpg", isAi: false }
        ]
    },
    {
        id: 4,
        zorluk: 'zor',
        kategori: 'manzara',
        gorseller: [
            { id: 401, url: "img/id11.jpg", isAi: false },
            { id: 402, url: "img/id22.png", isAi: true },
            { id: 403, url: "img/id33.jpg", isAi: false }
        ]
    },
    // --- HAYVAN KATEGORİSİ ---
    {
        id: 5,
        zorluk: 'kolay',
        kategori: 'hayvan',
        gorseller: [
            { id: 501, url: "img/1ü.jpg", isAi: false },
            { id: 502, url: "img/2ü.jpg", isAi: true },
            { id: 503, url: "img/3.jpg", isAi: false }
        ]
    },
    {
        id: 6,
        zorluk: 'zor',
        kategori: 'hayvan',
        gorseller: [
            { id: 601, url: "img/11.jpg", isAi: false },
            { id: 602, url: "img/33.jpg", isAi: true },
            { id: 603, url: "img/22.jpg", isAi: false }
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