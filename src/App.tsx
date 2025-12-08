import { useState } from 'react';
import './App.css'
import { BaslangicEkrani } from './components/BaslangicEkrani'
import { OyunEkrani } from './components/OyunEkrani';
import {SonucEkrani} from './components/SonucEkrani';

type EkranTipi = 'baslangic' | 'oyun' | 'sonuc';

function App() {
    // Hangi ekrandayız bilgisini tutan state.
    const [aktifEkran, setAktifEkran] = useState<EkranTipi>('baslangic');
    // Oyun sonucunu yazan state
    const [oyunSonucu, setOyunSonucu] = useState<'kazandi' | 'kaybetti'>('kaybetti');

    // Oyunu başlat
    const oyunuBaslat = () => {
        setAktifEkran('oyun'); // Aktif ekranı 'oyun' olarak değiştir
    }

    // Oyun bitince çalışacak fonksiyon OyunEkrani'ndan çağırdık
    const oyunuBitir = (sonuc: 'kazandi' | 'kaybetti') => {
        setOyunSonucu(sonuc);
        setAktifEkran('sonuc'); // Sonuç ekranına geç
    };

    // En başa dönme fonksiyonu
    const basaDon = () => {
        setAktifEkran('baslangic');
    };

    // Hangi component'in gösterileceğine karar veren mantık
    return (
        <>
            {aktifEkran === 'baslangic' && (
                <BaslangicEkrani onBaslaClick={oyunuBaslat} />
            )}

            {aktifEkran === 'oyun' && (
                <OyunEkrani onOyunBitti={oyunuBitir} />
            )}

            {aktifEkran === 'sonuc' && (
                <SonucEkrani sonuc={oyunSonucu} onBasaDon={basaDon} />
            )}
        </>
    );
}

export default App;