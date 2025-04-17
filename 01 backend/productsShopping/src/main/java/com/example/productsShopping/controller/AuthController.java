package com.example.productsShopping.controller;

import com.example.productsShopping.dto.LoginRequest;
import com.example.productsShopping.dto.RegisterRequest;
import com.example.productsShopping.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            // Попытка зарегистрировать пользователя
            String responseMessage = authService.registerUser(registerRequest);
            return ResponseEntity.ok(responseMessage);
        } catch (RuntimeException ex) {
            // Возвращаем ошибку с сообщением из исключения
            return ResponseEntity.status(400).body(ex.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            // Попытка авторизовать пользователя
            String token = authService.loginUser(loginRequest);
            return ResponseEntity.ok(token);
        } catch (RuntimeException ex) {
            // Возвращаем ошибку с сообщением из исключения
            return ResponseEntity.status(400).body(ex.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        try {
            // Вызываем метод логаута в сервисе (если есть логика на сервере)
            authService.logoutUser();

            // Отправляем клиенту успешный ответ
            return ResponseEntity.ok("Logout successful!");
        } catch (RuntimeException ex) {
            // Обрабатываем исключение
            return ResponseEntity.status(400).body(ex.getMessage());
        }
    }
}
