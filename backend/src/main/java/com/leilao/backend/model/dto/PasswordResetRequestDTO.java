package com.leilao.backend.model.dto;

import lombok.Data;

@Data
public class PasswordResetRequestDTO {
    private String email;
    private Integer recoveryCode;
    private String newPassword;
}
