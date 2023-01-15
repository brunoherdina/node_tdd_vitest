import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";

describe('Create Appointment', () => {
    
    it('should be able to create an appointment', () => {
        const createAppointment = new CreateAppointment();

        const startsAt = getFutureDate('2023-01-15');
        const endsAt = getFutureDate('2023-01-16');

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        })).resolves.toBeInstanceOf(Appointment);
    });
});