package com.leilao.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.leilao.backend.model.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {

    Optional<Person> findByEmail(String username);

    Optional<Person> findByEmailAndRecoveryCode(String email, Integer code);

    Optional<Person> findByCpf(String cpf);

    Optional<Person> findByUsername(String username);
    
}
