import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory-appointments-repository";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";

describe('Create Appointment', () => {
    
    it('should be able to create an appointment', () => {
        const appointmentsRepository = new InMemoryAppointmentsRepository();
        const createAppointment = new CreateAppointment(appointmentsRepository);

        const startsAt = getFutureDate('2023-01-15');
        const endsAt = getFutureDate('2023-01-16');

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        })).resolves.toBeInstanceOf(Appointment);
    });

    it('should not be able to create an appointment with overlapping dates', async () => {
        const appointmentsRepository = new InMemoryAppointmentsRepository();
        const createAppointment = new CreateAppointment(appointmentsRepository);

        const startsAt = getFutureDate('2023-01-15');
        const endsAt = getFutureDate('2023-01-18');

        await createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        });

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2023-01-15'),
            endsAt: getFutureDate('2023-01-18')
        })).rejects.toBeInstanceOf(Error);

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2023-01-12'),
            endsAt: getFutureDate('2023-01-16')
        })).rejects.toBeInstanceOf(Error);


        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2023-01-12'),
            endsAt: getFutureDate('2023-01-18')
        })).rejects.toBeInstanceOf(Error);


        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2023-01-16'),
            endsAt: getFutureDate('2023-01-17')
        })).rejects.toBeInstanceOf(Error);
    });
});