interface GorselProps {
    imageUrl: string;
    onClick: () => void;
    isSelected: boolean;
    isDisabled: boolean;
}

export const Gorsel = ({ imageUrl, onClick, isSelected, isDisabled }: GorselProps) => {
    return (
        <div
            // Eğer disabled ise 'elendi', seçili ise 'secili' sınıfını ekle
            className={`gorsel-kapsayici ${isSelected ? 'secili' : ''} ${isDisabled ? 'elendi' : ''}`}
            onClick={() => {
            // Eğer görsel elendiyse tıklamayı engelle
                if (!isDisabled) {
                    onClick();
                }
             }}
            >
            <img src={imageUrl} alt="Oyun Görseli" className="gorsel-resim" />
        </div>
    );
}