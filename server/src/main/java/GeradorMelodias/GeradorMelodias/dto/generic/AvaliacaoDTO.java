package GeradorMelodias.GeradorMelodias.dto.generic;

import GeradorMelodias.GeradorMelodias.entity.Melodia;
import GeradorMelodias.GeradorMelodias.enums.Sensacao;

public record AvaliacaoDTO(
        Long id,
        Integer nota,
        Sensacao sensacao,
        Melodia melodia
) {
}
