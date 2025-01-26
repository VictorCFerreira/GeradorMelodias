package GeradorMelodias.GeradorMelodias.entity;

import jakarta.persistence.*;

public class Download {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany
    @JoinColumn(name = "id_melodia", nullable = false)
    private Melodia melodia;
}
