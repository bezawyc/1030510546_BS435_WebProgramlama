import { Gorsel } from './Gorsel';
import { useState } from 'react';

const OYUN_VERISI = [
    {
        id: 1,
        url: "https://placehold.co/300x300/FF5733/FFFFFF?text=Gercek+1",
        isAi: false
    },
    {
        id: 2,
        url: "https://placehold.co/300x300/33FF57/FFFFFF?text=AI+Uretimi",
        isAi: true
    },
    {
        id: 3,
        url: "https://placehold.co/300x300/3357FF/FFFFFF?text=Gercek+2",
        isAi: false
    }
];

interface OyunEkraniProps {
    onOyunBitti: (sonuc: 'kazandi' | 'kaybetti') => void;
}

export const OyunEkrani = ({ onOyunBitti }: OyunEkraniProps) => {
    // Hangi görselin seçildiğini takip eden State
    const [secilenId, setSecilenId] = useState<number | null>(null);

    // YENİ STATE'LER
    const [hakSayisi, setHakSayisi] = useState(1); // 1. hak ile başlar
    const [ipucu, setIpucu] = useState<string>("");
    const [elenenId, setElenenId] = useState<number | null>(null);



    // 1. ADIM: Sadece görseli seçili hale getirir (Henüz kontrol etmez)
    const gorselSec = (id: number) => {
        setSecilenId(id);
    };

    // 2. ADIM: Butona basılınca cevabı kontrol eder
    const cevabiOnayla = () => {
        // Eğer hiçbir şey seçilmediyse işlem yapma
        if (secilenId === null) return;

        // Seçilen görselin verisini bul (isAi bilgisini almak için)
        const secilenGorsel = OYUN_VERISI.find(g => g.id === secilenId);

        // Güvenlik kontrolü (olur da görsel bulunamazsa)
        if (!secilenGorsel) return;

        const isAi = secilenGorsel.isAi;

        if (isAi) {
            onOyunBitti('kazandi');
        }
        // 2. Durum: YANLIŞ TAHMİN
        else {
            if (hakSayisi === 1) {
                // İlk hak yandı İpucu ver ve ikinci şansı tanı
                setHakSayisi(2);
                setElenenId(secilenId); // Bu görseli devre dışı bırak (sönükleştir)
                setIpucu("Yanlış! İpucu: Görsellerdeki gölgelere ve detaylara daha dikkatli bak.");
                setSecilenId(null); // Seçimi sıfırla ki yeni seçim yapabilsin
            } else {
                onOyunBitti('kaybetti');
                }
            }
        };


    return (
        <div className="oyun-ekrani">
            <h2>{hakSayisi === 1 ? 'İlk Tahminini Yap!' : 'Son Şansın!'}</h2>
            <p>Hangi görsel yapay zeka tarafından üretilmiştir?</p>


            {/*ipucu için*/}
            {ipucu && (
                <div className="ipucu-kutusu">
                    ⚠️ {ipucu}
                </div>
            )}

            <div className="gorsel-alani">
                {/* Burada 'map' fonksiyonu kullanıyoruz.
            Yani 3 kere elle gorsel yazmak yerine, listeyi döngüye sokuyoruz.
        */}
                {OYUN_VERISI.map((gorsel) => (
                    <Gorsel
                        key={gorsel.id}
                        imageUrl={gorsel.url}
                        isSelected={secilenId === gorsel.id} // Eğer tıklanan ID bu ise çerçeve yak
                        isDisabled={elenenId === gorsel.id} // Elenen görsel sönük kalacak ve tıklanamayacak
                        onClick={() => gorselSec(gorsel.id)}
                    />
                ))}
            </div>

            {/* Seçim yapıldıysa altta yazsın */}
            {secilenId !== null && (
                <div style={{ marginTop: '20px', color: '#333' }}>
                    Seçilen Görsel ID: <strong>{secilenId}</strong>
                </div>
            )}

            <div className="buton-alani">
                <button
                    className="onayla-btn"
                    onClick={cevabiOnayla}
                    disabled={secilenId === null} // Hiçbir şey seçili değilse buton çalışmaz
                >
                    Seçimi Onayla
                </button>
            </div>

        </div>
    );
}