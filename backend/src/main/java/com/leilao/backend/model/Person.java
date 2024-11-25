package com.leilao.backend.model;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Entity
@Table(name = "person")
@Data
@JsonIgnoreProperties({ "authorities", "enabled", "accountNonLocked", "credentialsNonExpired", "accountNonExpired" })
public class Person implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    @NotBlank(message = "{name.required}")
    private String name;

    @Column(name = "cpf", nullable = false, unique = true)
    @NotBlank(message = "{cpf.required}")
    private String cpf;

    @Column(name = "phone_number", nullable = false)
    @NotBlank(message = "{phone.required}")
    private String phoneNumber;

    @Column(name = "username", nullable = false, unique = true)
    @NotBlank(message = "{username.required}")
    private String username;

    @Email(message = "{email.invalid}")
    @NotBlank(message = "{email.required}")
    @Column(unique = true, nullable = false)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column(name = "is_verified", nullable = false)
    private boolean isVerified = false; 

    @Transient
    private final static PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void setPassword(String password) {
        this.password = passwordEncoder.encode(password);
    }

    @JsonIgnore
    @Column(name = "recovery_code", nullable = true)
    private Integer recoveryCode; 

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "recovery_code_validity", nullable = true)
    private Date recoveryCodeValidity; 

    @OneToMany(mappedBy = "person", orphanRemoval = true, cascade = CascadeType.ALL)
    @Setter(value = AccessLevel.NONE)
    private List<PersonPofile> personPofile;

    public void setPersonPofile(List<PersonPofile> listPersonPofile) {
        for (PersonPofile profile : listPersonPofile) {
            profile.setPerson(this);
        }
        personPofile = listPersonPofile;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return personPofile.stream()
                .map(userRole -> new SimpleGrantedAuthority(userRole.getProfile().getName()))
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return email;
    }
}
