package GeradorMelodias.GeradorMelodias.dto.request;

import GeradorMelodias.GeradorMelodias.entity.Melodia;
import GeradorMelodias.GeradorMelodias.entity.avaliacao.Sensacao;

public record CreateAvaliacaoDTO(
        Integer nota,
        Sensacao sensacao,
        Long melodiaId
) {
}
