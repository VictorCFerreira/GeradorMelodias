package GeradorMelodias.GeradorMelodias.dto.request;


import GeradorMelodias.GeradorMelodias.enums.Sensacao;

public record CreateAvaliacaoDTO(
        Integer nota,
        Sensacao sensacao,
        Long melodiaId
) {
}
