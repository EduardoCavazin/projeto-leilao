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
import com.leilao.backend.model.PersonAuthRequestDTO;
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
        return personRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
    }

    public Person create(Person person) {
        Person personSaved = personRepository.save(person);
        Context context = new Context();
        context.setVariable("name", personSaved.getName());
        try {
            emailService.sendTemplateEmail(personSaved.getEmail(), "Cadastro Efetuado com Sucesso", context,
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

            int validationCode = new SecureRandom().nextInt(9000) + 1000; 
            personDatabase.setValidationCode(validationCode);

            Date validade = new Date(System.currentTimeMillis() + (10 * 60 * 1000));
            personDatabase.setValidationCodeValidity(validade);

            personRepository.save(personDatabase);

            Context context = new Context();
            context.setVariable("name", personDatabase.getName());
            context.setVariable("validationCode", validationCode);

            try {
                emailService.sendTemplateEmail(
                        personDatabase.getEmail(),
                        "Recuperação de Senha",
                        context,
                        "emailPasswordRecovery" 
                );
            } catch (MessagingException e) {
                throw new RuntimeException("Erro ao enviar e-mail: " + e.getMessage());
            }

            return "Código de recuperação enviado com sucesso.";
        } else {
            throw new NoSuchElementException("Usuário não encontrado");
        }
    }

}
