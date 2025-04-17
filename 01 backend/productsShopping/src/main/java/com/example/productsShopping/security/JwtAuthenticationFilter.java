package com.example.productsShopping.security;

import com.example.productsShopping.security.JwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor; // Для автоматической генерации конструктора с финальными полями.
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; // Используется для создания аутентификации.
import org.springframework.security.core.context.SecurityContextHolder; // Контекст безопасности для хранения информации об аутентификации.
import org.springframework.security.core.userdetails.UserDetails; // Интерфейс для данных пользователя.
import org.springframework.security.core.userdetails.UserDetailsService; // Сервис для загрузки данных пользователя.
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource; // Источник для создания деталей аутентификации.
import org.springframework.stereotype.Component; // Указывает, что это Spring-компонент.
import org.springframework.util.StringUtils; // Утилиты для работы со строками.
import org.springframework.web.filter.OncePerRequestFilter; // Фильтр, который выполняется один раз за запрос.

import java.io.IOException;

@Component // Делает класс Spring-компонентом.
@RequiredArgsConstructor // Генерирует конструктор для всех финальных полей.
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider; // Провайдер для работы с JWT.
    private final UserDetailsService userDetailsService; // Сервис для получения информации о пользователе.

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        try {
            // Извлечение токена из запроса.
            String jwt = getJwtFromRequest(request);

            // Проверка, что токен есть и он валиден.
            if (StringUtils.hasText(jwt) && jwtTokenProvider.validateToken(jwt)) {
                String username = jwtTokenProvider.getUsernameFromJWT(jwt); // Получение имени пользователя из токена.

                // Загрузка информации о пользователе.
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                // Создание объекта аутентификации.
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities()
                        );

                // Добавление деталей запроса в аутентификацию.
                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // Установка аутентификации в контекст безопасности.
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception ex) {
            logger.error("Could not set user authentication in security context", ex); // Логирование ошибок.
        }

        // Продолжение цепочки фильтров.
        filterChain.doFilter(request, response);
    }

    // Извлечение JWT из заголовка "Authorization".
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization"); // Чтение заголовка.
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // Удаление префикса "Bearer " и возврат токена.
        }
        return null; // Если токен отсутствует или неверный, вернуть null.
    }
}
