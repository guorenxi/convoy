FROM alpine:3.20.2

COPY convoy /cmd
COPY configs/local/start.sh /start.sh
RUN chmod +x /cmd
RUN apk add --no-cache gcompat
CMD ["/start.sh"]
