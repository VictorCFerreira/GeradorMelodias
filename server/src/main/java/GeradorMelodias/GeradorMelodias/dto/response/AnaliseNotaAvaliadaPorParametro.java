package GeradorMelodias.GeradorMelodias.dto.response;

public record AnaliseNotaAvaliadaPorParametro(
        String parametro,
        String faixaNota,
        Long quantidadeMelodiaAval
) {

}
