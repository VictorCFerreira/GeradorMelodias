package GeradorMelodias.GeradorMelodias.dto.generic;

import GeradorMelodias.GeradorMelodias.entity.Melodia;
import GeradorMelodias.GeradorMelodias.entity.avaliacao.Sensacao;
import jakarta.persistence.*;

public record AvaliacaoDTO(
        Long id,
        Integer nota,
        Sensacao sensacao,
        Melodia melodia
) {
}
