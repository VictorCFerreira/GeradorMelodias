package GeradorMelodias.GeradorMelodias.enums;

import lombok.Getter;

@Getter
public enum Sensacao {
    ALEGRE("Alegre"),
    TRISTE("Triste"),
    INSPIRADO("Inspirado"),
    NOSTALGICO("Nostálgico"),
    RELAXADO("Relaxado"),
    ENERGIZADO("Energizado");

    private final String descricao;

    Sensacao(String descricao) {
        this.descricao = descricao;
    }
}
