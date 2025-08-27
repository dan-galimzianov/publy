import 'package:dartz/dartz.dart';

import 'errors/failures.dart';

/// Type alias for Result using Either from dartz
/// Left side represents failure, Right side represents success
typedef Result<T> = Either<Failure, T>;

/// Extension methods for Result type
extension ResultX<T> on Result<T> {
  /// Returns true if the result is a success
  bool get isSuccess => isRight();

  /// Returns true if the result is a failure
  bool get isFailure => isLeft();

  /// Gets the success value or null if failure
  T? get valueOrNull => fold((failure) => null, (value) => value);

  /// Gets the failure or null if success
  Failure? get failureOrNull => fold((failure) => failure, (value) => null);
}
