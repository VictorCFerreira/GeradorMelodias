package GeradorMelodias.GeradorMelodias.dto.request;

public record RequestAnaliseParametroNotaDTO(
        Integer notaMinima,
        Integer notaMaxima,
        String parametro
        ) {
}
