// src/App.tsx

import { useState } from 'react';
import './App.css';
import { BaslangicEkrani } from './components/BaslangicEkrani';
import { OyunEkrani } from './components/OyunEkrani';
import { SonucEkrani } from './components/SonucEkrani';

type EkranTipi = 'baslangic' | 'oyun' | 'sonuc';

function App() {
    const [aktifEkran, setAktifEkran] = useState<EkranTipi>('baslangic');
    const [oyunSonucu, setOyunSonucu] = useState<'kazandi' | 'kaybetti'>('kaybetti');

    // HAFTA 7-8: Oyun Modu State'leri
    const [zorluk, setZorluk] = useState<string>('kolay');
    const [kategori, setKategori] = useState<string>('insan');

    const oyunuBaslat = () => {
        setAktifEkran('oyun');
    }

    const oyunuBitir = (sonuc: 'kazandi' | 'kaybetti') => {
        setOyunSonucu(sonuc);
        setAktifEkran('sonuc');
    };

    const basaDon = () => {
        setAktifEkran('baslangic');
    };

    return (
        <>
            {aktifEkran === 'baslangic' && (
                <BaslangicEkrani
                    onBaslaClick={oyunuBaslat}
                    setZorluk={setZorluk}
                    setKategori={setKategori}
                    secilenZorluk={zorluk}
                    secilenKategori={kategori}
                />
            )}

            {aktifEkran === 'oyun' && (
                <OyunEkrani
                    onOyunBitti={oyunuBitir}
                    secilenZorluk={zorluk}   // Seçilen zorluğu gönder
                    secilenKategori={kategori} // Seçilen kategoriyi gönder
                />
            )}

            {aktifEkran === 'sonuc' && (
                <SonucEkrani sonuc={oyunSonucu} onBasaDon={basaDon} />
            )}
        </>
    );
}

export default App;