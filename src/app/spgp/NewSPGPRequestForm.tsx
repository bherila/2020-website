'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ParsedSPGPPassType } from '@/app/spgp/SPGPPassTypes'
import Row from 'react-bootstrap/Row'
import {
  SPGPRequestSchema,
  SPGPRequestType,
} from '@/app/spgp/SPGPRequestSchema'

const NewSPGPRequestForm = ({
  passTypes,
}: {
  passTypes: ParsedSPGPPassType[]
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SPGPRequestType>({
    resolver: zodResolver(SPGPRequestSchema),
  })

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <Row>
        <label>
          First name (must match photo ID): <input {...register('r_first')} />
        </label>
        {errors.r_first?.message && <p>{errors.r_first?.message as string}</p>}
      </Row>

      <Row>
        <label>
          Last name (must match photo ID): <input {...register('r_last')} />
        </label>
        {errors.r_last?.message && <p>{errors.r_last?.message as string}</p>}
      </Row>

      <Row>
        <label>
          Email of pass holder: <input type="email" {...register('r_email')} />
        </label>
        {errors.r_email?.message && <p>{errors.r_email?.message as string}</p>}
      </Row>

      <Row>
        <label>
          Birth date:
          <input type="date" {...register('r_birthdate')} />
        </label>
        {errors.r_birthdate?.message && (
          <p>{errors.r_birthdate?.message as string}</p>
        )}
      </Row>

      <Row>
        <label>
          Type requested:
          {passTypes?.map((passType) => (
            <label key={passType.passtype_id}>
              <input
                type="radio"
                {...register('passtype_id')}
                value={passType.passtype_id}
              />
              {passType.display_name}
            </label>
          ))}
        </label>
        {errors.passtype_id?.message && (
          <p>{errors.passtype_id?.message as string}</p>
        )}
      </Row>

      <Row>
        <label>
          (If applicable) Previous pass ID (starts with letter I):{' '}
          <input {...register('r_previous_passid')} />
        </label>
        {errors.r_previous_passid?.message && (
          <p>{errors.r_previous_passid?.message as string}</p>
        )}
      </Row>

      <input type="submit" />
    </form>
  )
}

export default NewSPGPRequestForm
