// src/components/BaslangicEkrani.tsx

interface BaslangicEkraniProps {
    onBaslaClick: () => void;
    // Seçim değiştirme fonksiyonları
    setZorluk: (zorluk: string) => void;
    setKategori: (kategori: string) => void;
    secilenZorluk: string;
    secilenKategori: string;
}

export const BaslangicEkrani = ({
                                    onBaslaClick,
                                    setZorluk,
                                    setKategori,
                                    secilenZorluk,
                                    secilenKategori
                                }: BaslangicEkraniProps) => {
    return (
        <div className="start-screen">
            <h1>AI Tahmin Oyunu</h1>
            <p>
                Kurallar: Ekrana gelecek 3 görselden 1 tanesi yapay zeka
                tarafından üretilmiştir. Hangisi olduğunu bulmaya çalışın.
            </p>

            {/* --- OYUN MODU SEÇİMLERİ --- */}
            <div className="secim-alani">
                <div className="secim-kutusu">
                    <label>Zorluk Seviyesi:</label>
                    <select
                        value={secilenZorluk}
                        onChange={(e) => setZorluk(e.target.value)}
                    >
                        <option value="kolay">Kolay</option>
                        <option value="zor">Zor</option>
                    </select>
                </div>

                <div className="secim-kutusu">
                    <label>Kategori:</label>
                    <select
                        value={secilenKategori}
                        onChange={(e) => setKategori(e.target.value)}
                    >
                        <option value="insan">İnsanlar</option>
                        <option value="manzara">Manzaralar</option>
                        <option value="sanat">Sanat Eserleri</option>
                    </select>
                </div>
            </div>

            <button onClick={onBaslaClick} className="basla-butonu">
                Oyuna Başla
            </button>
        </div>
    );
}