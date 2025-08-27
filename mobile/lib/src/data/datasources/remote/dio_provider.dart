import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

part 'dio_provider.g.dart';

@riverpod
Dio dio(Ref ref) {
  final dio = Dio();

  // Base configuration
  dio.options = BaseOptions(
    baseUrl: 'http://localhost:3000/api',
    connectTimeout: const Duration(seconds: 5),
    receiveTimeout: const Duration(seconds: 3),
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
  );

  // Add interceptors
  dio.interceptors.add(
    LogInterceptor(
      requestBody: true,
      responseBody: true,
      logPrint: (object) {
        // You can customize logging here
        debugPrint(object.toString());
      },
    ),
  );

  return dio;
}
