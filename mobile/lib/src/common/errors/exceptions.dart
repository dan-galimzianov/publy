/// Base class for all exceptions in the application
abstract class AppException implements Exception {
  const AppException(this.message);

  final String message;

  @override
  String toString() => message;
}

/// Server exception
class ServerException extends AppException {
  const ServerException(super.message, [this.statusCode]);

  final int? statusCode;
}

/// Network exception
class NetworkException extends AppException {
  const NetworkException(super.message);
}

/// Cache exception
class CacheException extends AppException {
  const CacheException(super.message);
}

/// Validation exception
class ValidationException extends AppException {
  const ValidationException(super.message);
}
