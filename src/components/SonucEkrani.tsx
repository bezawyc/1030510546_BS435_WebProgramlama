// src/components/SonucEkrani.tsx

interface SonucEkraniProps {
    sonuc: 'kazandi' | 'kaybetti';
    onBasaDon: () => void;
}

export const SonucEkrani = ({ sonuc, onBasaDon }: SonucEkraniProps) => {
    return (
        <div className={`sonuc-ekrani ${sonuc}`}>
            <h1>
                {sonuc === 'kazandi' ? '🎉 TEBRİKLER! 🎉' : '😔 MAALESEF...'}
            </h1>
            <p>
                {sonuc === 'kazandi'
                    ? 'Harika! Yapay zeka görselini başarıyla tespit ettin.'
                    : 'Yanlış görseli seçtin. Bir dahaki sefere dikkatli ol!'}
            </p>

            <button onClick={onBasaDon} className="yeniden-basla-btn">
                Yeniden Oyna
            </button>
        </div>
    );
}