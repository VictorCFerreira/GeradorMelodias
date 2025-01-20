package GeradorMelodias.GeradorMelodias.utils.GeracaoMelodias;

public enum Escala {
    C(new String[]{"C", "D", "E", "F", "G", "A", "B"}),
    C_MENOR(new String[]{"C", "D", "Eb", "F", "G", "Ab", "Bb"}),
    C_SUSTENIDO(new String[]{"C#", "D#", "E#", "F#", "G#", "A#", "B#"}),
    C_SUSTENIDO_MENOR(new String[]{"C#", "D#", "E", "F#", "G#", "A", "B"}),
    D(new String[]{"D", "E", "F#", "G", "A", "B", "C#"}),
    D_MENOR(new String[]{"D", "E", "F", "G", "A", "Bb", "C"}),
    D_SUSTENIDO(new String[]{"D#", "E#", "F##", "G#", "A#", "B#", "C##"}),
    D_SUSTENIDO_MENOR(new String[]{"D#", "E#", "F#", "G#", "A#", "B", "C#"}),
    E(new String[]{"E", "F#", "G#", "A", "B", "C#", "D#"}),
    E_MENOR(new String[]{"E", "F#", "G", "A", "B", "C", "D"}),
    F(new String[]{"F", "G", "A", "Bb", "C", "D", "E"}),
    F_MENOR(new String[]{"F", "G", "Ab", "Bb", "C", "Db", "Eb"}),
    F_SUSTENIDO(new String[]{"F#", "G#", "A#", "B", "C#", "D#", "E#"}),
    F_SUSTENIDO_MENOR(new String[]{"F#", "G#", "A", "B", "C#", "D", "E"}),
    G(new String[]{"G", "A", "B", "C", "D", "E", "F#"}),
    G_MENOR(new String[]{"G", "A", "Bb", "C", "D", "Eb", "F"}),
    G_SUSTENIDO(new String[]{"G#", "A#", "B#", "C#", "D#", "E#", "F##"}),
    G_SUSTENIDO_MENOR(new String[]{"G#", "A#", "B", "C#", "D#", "E", "F#"}),
    A(new String[]{"A", "B", "C#", "D", "E", "F#", "G#"}),
    A_MENOR(new String[]{"A", "B", "C", "D", "E", "F", "G"}),
    A_SUSTENIDO(new String[]{"A#", "B#", "C##", "D#", "E#", "F##", "G##"}),
    A_SUSTENIDO_MENOR(new String[]{"A#", "B#", "C#", "D#", "E#", "F#", "G#"}),
    B(new String[]{"B", "C#", "D#", "E", "F#", "G#", "A#"}),
    B_MENOR(new String[]{"B", "C#", "D", "E", "F#", "G", "A"});

    private final String[] notas;

    Escala(String[] notas) {
        this.notas = notas;
    }

    public String[] getNotas() {
        return notas;
    }
}
