import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteGenericInterface,
  RouteHandlerMethod
} from "fastify";
import "@fastify/cookie";

export type UseRouteHandlerMethod<
  RouteGeneric extends RouteGenericInterface = {}
> = RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteGeneric
>
