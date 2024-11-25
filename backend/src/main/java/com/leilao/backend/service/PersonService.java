package com.leilao.backend.service;

import java.security.SecureRandom;
import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import com.leilao.backend.model.Person;
import com.leilao.backend.model.dto.PasswordResetRequestDTO;
import com.leilao.backend.model.dto.PersonAuthRequestDTO;
import com.leilao.backend.repository.PersonRepository;

import jakarta.mail.MessagingException;

@Service
public class PersonService implements UserDetailsService {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Person person = personRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        if (!person.isVerified()) {
            throw new IllegalArgumentException("Cadastro não confirmado. Verifique seu e-mail.");
        }

        return person;
    }

    public Person create(Person person) {
        if (personRepository.findByEmail(person.getEmail()).isPresent()) {
            throw new IllegalArgumentException("E-mail já está em uso.");
        }

        if (personRepository.findByCpf(person.getCpf()).isPresent()) {
            throw new IllegalArgumentException("CPF já está em uso.");
        }

        if (personRepository.findByUsername(person.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Nome de usuário já está em uso.");
        }

        Person personSaved = personRepository.save(person);

        String confirmationLink = "http://localhost:3000/confirm?email=" + personSaved.getEmail();
        Context context = new Context();
        context.setVariable("name", personSaved.getName());
        context.setVariable("confirmationLink", confirmationLink);

        try {
            emailService.sendTemplateEmail(
                    personSaved.getEmail(),
                    "Cadastro Efetuado com Sucesso",
                    context,
                    "emailWelcome");
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return personSaved;
    }

    public Person update(Person person) {
        Person personSaved = personRepository.findById(person.getId())
                .orElseThrow(() -> new NoSuchElementException("Objeto não encontrado"));
        personSaved.setName(person.getName());
        personSaved.setEmail(person.getEmail());
        return personRepository.save(personSaved);
    }

    public void delete(Long id) {
        Person personSaved = personRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Objeto não encontrado"));
        personRepository.delete(personSaved);
    }

    public String passwordCodeRequest(PersonAuthRequestDTO personAuthRequestDTO) {
        Optional<Person> personOptional = personRepository.findByEmail(personAuthRequestDTO.getEmail());

        if (personOptional.isPresent()) {
            Person personDatabase = personOptional.get();

            int recoveryCode = new SecureRandom().nextInt(9000) + 1000;
            personDatabase.setRecoveryCode(recoveryCode);

            Date validity = new Date(System.currentTimeMillis() + (10 * 60 * 1000));
            personDatabase.setRecoveryCodeValidity(validity);

            personRepository.save(personDatabase);

            Context context = new Context();
            context.setVariable("name", personDatabase.getName());
            context.setVariable("recoveryCode", recoveryCode);

            try {
                emailService.sendTemplateEmail(
                        personDatabase.getEmail(),
                        "Recuperação de Senha",
                        context,
                        "emailPasswordRecovery");
            } catch (MessagingException e) {
                throw new RuntimeException("Erro ao enviar e-mail: " + e.getMessage());
            }

            return "Código de recuperação enviado com sucesso.";
        } else {
            throw new NoSuchElementException("Usuário não encontrado");
        }
    }

    public String resetPassword(PasswordResetRequestDTO passwordResetRequestDTO) {
        Optional<Person> personOptional = personRepository.findByEmail(passwordResetRequestDTO.getEmail());
        if (personOptional.isEmpty()) {
            throw new NoSuchElementException("Usuário não encontrado");
        }

        Person person = personOptional.get();

        if (person.getRecoveryCode() == null
                || !person.getRecoveryCode().equals(passwordResetRequestDTO.getRecoveryCode())) {
            throw new IllegalArgumentException("Código de recuperação inválido");
        }

        if (person.getRecoveryCodeValidity() == null || person.getRecoveryCodeValidity().before(new Date())) {
            throw new IllegalArgumentException("Código de recuperação expirado");
        }

        person.setPassword(passwordResetRequestDTO.getNewPassword());

        person.setRecoveryCode(null);
        person.setRecoveryCodeValidity(null);

        personRepository.save(person);

        return "Senha alterada com sucesso.";
    }

    public String confirmAccount(String email) {

        Optional<Person> personOptional = personRepository.findByEmail(email);
        if (personOptional.isEmpty()) {
            throw new NoSuchElementException("Usuário não encontrado");
        }

        Person person = personOptional.get();
        person.setVerified(true);
        personRepository.save(person);

        return "Cadastro confirmado com sucesso.";
    }

}
