package com.leilao.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "images")
@Data
public class Images {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    @Pattern(regexp = "^(image/(png|jpeg|jpg))$", message = "Tipo de arquivo inválido.")
    private String fileType;

    @Column(nullable = false)
    private long size;

    @Lob
    @Column(columnDefinition = "LONGBLOB", nullable = false)
    @JsonIgnore
    private byte[] data;

    @ManyToOne
    @JoinColumn(name = "auction_id", nullable = false)
    @JsonIgnore
    private Auction auction;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
