package entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Table(name = "parametros")
@Entity
@Getter
@Setter
public class Parametros {
    @Id
    private long id;

    private String instrumento;
    private String escala;
    private Integer categoria;
    private Integer bpm;
}
